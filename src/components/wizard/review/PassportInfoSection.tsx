
import { ApplicationFormState } from "@/hooks/useApplicationForm";

interface PassportInfoSectionProps {
  form: ApplicationFormState;
}

export default function PassportInfoSection({ form }: PassportInfoSectionProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-medium text-gray-900 mb-3">Passport Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-600">Passport Number:</span>
          <span className="ml-2 font-medium">{form.passport}</span>
        </div>
        <div>
          <span className="text-gray-600">Nationality:</span>
          <span className="ml-2 font-medium">{form.nationality}</span>
        </div>
        <div>
          <span className="text-gray-600">Issue Date:</span>
          <span className="ml-2 font-medium">{form.passportIssueDate}</span>
        </div>
        <div>
          <span className="text-gray-600">Expiry Date:</span>
          <span className="ml-2 font-medium">{form.passportExpiryDate}</span>
        </div>
      </div>
    </div>
  );
}
