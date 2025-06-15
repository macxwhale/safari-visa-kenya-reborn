
interface ReviewStepProps {
  travelerType: string;
  applicationType?: string;
  country?: string;
  form: {
    fullName: string;
    email: string;
    passport: string;
    nationality: string;
    travelFrom: string;
    entryDate: string;
    doc: File | null;
  };
}

export default function ReviewStep({ travelerType, applicationType, country, form }: ReviewStepProps) {
  return (
    <div className="animate-fade-in">
      <h2 className="font-semibold mb-2 text-lg">Review your information</h2>
      <ul className="list-disc ml-4 space-y-1 text-gray-700">
        <li>Traveler Type: <span className="font-mono">{travelerType}</span></li>
        {applicationType && <li>Application Type: <span className="font-mono">{applicationType}</span></li>}
        {country && <li>Country of Residence: <span className="font-mono">{country}</span></li>}
        <li>Name: <span className="font-mono">{form.fullName}</span></li>
        <li>Email: <span className="font-mono">{form.email}</span></li>
        <li>Passport Number: <span className="font-mono">{form.passport}</span></li>
        <li>Nationality: <span className="font-mono">{form.nationality}</span></li>
        <li>From: <span className="font-mono">{form.travelFrom}</span></li>
        <li>Entry Date: <span className="font-mono">{form.entryDate}</span></li>
        <li>Document: <span className="font-mono">{form.doc?.name ? form.doc.name : "none"}</span></li>
      </ul>
      <div className="mt-3 text-[0.95rem] text-muted-foreground">Please ensure all data is correct before submission.</div>
    </div>
  );
}
