
import ApplicationSummaryCard from "@/components/ApplicationSummaryCard";

const applications = [
  {
    reference: "ETA20249001",
    name: "Jane Doe",
    status: "Under Review",
    submitted: "2025-06-10",
  },
  {
    reference: "ETA20248997",
    name: "John Smith",
    status: "Approved",
    submitted: "2025-06-05",
  },
  {
    reference: "ETA20247888",
    name: "Alex Kim",
    status: "Rejected",
    submitted: "2025-05-18",
  },
];

export default function MyApplications() {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-5xl mx-auto pt-14">
        <h1 className="text-2xl font-bold mb-6">My eTA Applications</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {applications.map((a) => (
            <ApplicationSummaryCard key={a.reference} {...a} />
          ))}
        </div>
      </div>
    </div>
  );
}
