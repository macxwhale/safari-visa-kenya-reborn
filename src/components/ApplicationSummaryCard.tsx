
import { Calendar, Check, Flag, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ApplicationSummaryCard({
  reference,
  name,
  status,
  submitted,
}: {
  reference: string;
  name: string;
  status: "Under Review" | "Approved" | "Rejected";
  submitted: string;
}) {
  let statusColor =
    status === "Approved"
      ? "bg-green-100 text-green-800"
      : status === "Rejected"
      ? "bg-red-100 text-red-800"
      : "bg-yellow-100 text-yellow-800";
  let icon =
    status === "Approved" ? <Check className="text-green-500" /> : status === "Rejected" ? <Flag className="text-red-500" /> : <User className="text-yellow-500" />;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 h-full flex flex-col justify-between animate-fade-in hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className={cn("text-xs font-bold uppercase tracking-tight px-2 py-1 rounded", statusColor)}>
          {status}
        </span>
      </div>
      <div className="font-medium mb-1 text-lg">{name}</div>
      <div className="mb-2 text-xs text-gray-500">Reference: {reference}</div>
      <div className="flex items-center gap-1 text-xs text-gray-500">
        <Calendar size={15} />
        <span>Submitted: {submitted}</span>
      </div>
    </div>
  );
}
