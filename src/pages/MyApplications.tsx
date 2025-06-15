
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import ApplicationSummaryCard from "@/components/ApplicationSummaryCard";
import { useNavigate } from "react-router-dom";

type StatusType = "Under Review" | "Approved" | "Rejected";

export default function MyApplications() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const { data: applications, isLoading, error } = useQuery({
    queryKey: ["applications", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("eta_applications")
        .select("*")
        .order("submitted_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  if (!loading && !user) {
    navigate("/auth");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-5xl mx-auto pt-14">
        <h1 className="text-2xl font-bold mb-6">My eTA Applications</h1>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-600">{error.message}</div>
        ) : applications && applications.length === 0 ? (
          <div className="text-gray-500">No applications found.</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {applications?.map((a: any) => (
              <ApplicationSummaryCard
                key={a.id}
                reference={a.id.slice(0, 12).toUpperCase()}
                name={a.full_name}
                status={a.status as StatusType}
                submitted={a.submitted_at?.slice(0, 10)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
