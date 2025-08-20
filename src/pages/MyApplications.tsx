
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import ApplicationSummaryCard from "@/components/ApplicationSummaryCard";
import { PullToRefresh } from "@/components/PullToRefresh";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

type StatusType = "Under Review" | "Approved" | "Rejected";

export default function MyApplications() {
  const { data: applications, isLoading, error, refetch } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("eta_applications")
        .select("*")
        .order("submitted_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const handleRefresh = async () => {
    await refetch();
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4 p-6 bg-background rounded-lg border">
              <LoadingSkeleton className="h-6 w-32" />
              <LoadingSkeleton className="h-4 w-24" />
              <LoadingSkeleton className="h-4 w-20" />
              <LoadingSkeleton className="h-8 w-full" />
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-12">
          <div className="text-destructive text-sm mb-4">
            {error.message}
          </div>
          <button 
            onClick={handleRefresh}
            className="text-info hover:text-info/80 text-sm underline"
          >
            Try again
          </button>
        </div>
      );
    }

    if (!applications || applications.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-base">
            No applications found.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Pull down to refresh
          </p>
        </div>
      );
    }

    return (
      <div className="grid md:grid-cols-3 gap-8">
        {applications.map((a: any) => (
          <ApplicationSummaryCard
            key={a.id}
            reference={a.id.slice(0, 12).toUpperCase()}
            name={a.full_name}
            status={a.status as StatusType}
            submitted={a.submitted_at?.slice(0, 10)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <PullToRefresh onRefresh={handleRefresh}>
        <div className="max-w-5xl mx-auto pt-8 px-4 pb-24">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              eTA Applications
            </h1>
            <p className="text-muted-foreground">
              View and track your visa applications
            </p>
          </div>
          
          {renderContent()}
        </div>
      </PullToRefresh>
    </div>
  );
}
