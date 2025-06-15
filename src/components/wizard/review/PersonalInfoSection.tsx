
import { ApplicationFormState } from "@/hooks/useApplicationForm";

interface PersonalInfoSectionProps {
  form: ApplicationFormState;
}

export default function PersonalInfoSection({ form }: PersonalInfoSectionProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-medium text-gray-900 mb-3">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-600">Full Name:</span>
          <span className="ml-2 font-medium">{form.fullName}</span>
        </div>
        <div>
          <span className="text-gray-600">Email:</span>
          <span className="ml-2 font-medium">{form.email}</span>
        </div>
        <div>
          <span className="text-gray-600">Phone:</span>
          <span className="ml-2 font-medium">{form.phone}</span>
        </div>
        <div>
          <span className="text-gray-600">Date of Birth:</span>
          <span className="ml-2 font-medium">{form.dateOfBirth}</span>
        </div>
        <div>
          <span className="text-gray-600">Place of Birth:</span>
          <span className="ml-2 font-medium">{form.placeOfBirth}</span>
        </div>
        <div>
          <span className="text-gray-600">Home Address:</span>
          <span className="ml-2 font-medium">{form.homeAddress}</span>
        </div>
        <div>
          <span className="text-gray-600">Occupation:</span>
          <span className="ml-2 font-medium">{form.occupation}</span>
        </div>
      </div>
    </div>
  );
}
