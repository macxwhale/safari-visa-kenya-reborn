
import { ApplicationFormState } from "@/hooks/useApplicationForm";

interface DocumentsSectionProps {
  form: ApplicationFormState;
}

export default function DocumentsSection({ form }: DocumentsSectionProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-medium text-gray-900 mb-3">Uploaded Documents</h3>
      <div className="space-y-3 text-sm">
        <div>
          <span className="text-gray-600">Passport Document:</span>
          <span className="ml-2 font-medium text-gray-900">
            {form.passportDoc ? form.passportDoc.name : "Not uploaded"}
          </span>
        </div>
        <div>
          <span className="text-gray-600">Photo/Selfie:</span>
          <span className="ml-2 font-medium text-gray-900">
            {form.selfieDoc ? form.selfieDoc.name : "Not uploaded"}
          </span>
        </div>
        
        {form.accommodationDocs.length > 0 && (
          <div>
            <span className="text-gray-600">Accommodation Bookings:</span>
            <ul className="ml-4 mt-1 list-disc list-inside text-gray-900">
              {form.accommodationDocs.map((doc, index) => (
                <li key={index} className="font-medium">{doc.name}</li>
              ))}
            </ul>
          </div>
        )}
        
        {form.airlineDocs.length > 0 && (
          <div>
            <span className="text-gray-600">Airline/Cruise Bookings:</span>
            <ul className="ml-4 mt-1 list-disc list-inside text-gray-900">
              {form.airlineDocs.map((doc, index) => (
                <li key={index} className="font-medium">{doc.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
