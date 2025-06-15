
import { ApplicationFormState } from "@/hooks/useApplicationForm";
import ApplicationDetailsSection from "./review/ApplicationDetailsSection";
import PersonalInfoSection from "./review/PersonalInfoSection";
import PassportInfoSection from "./review/PassportInfoSection";
import TravelInfoSection from "./review/TravelInfoSection";
import TravellerInfoSection from "./review/TravellerInfoSection";
import DocumentsSection from "./review/DocumentsSection";
import CustomsDeclarationSection from "./review/CustomsDeclarationSection";

interface ReviewStepProps {
  travelerType: string;
  applicationType?: string;
  country?: string;
  form: ApplicationFormState;
}

export default function ReviewStep({ travelerType, applicationType, country, form }: ReviewStepProps) {
  return (
    <div className="animate-fade-in max-w-2xl">
      <h2 className="text-xl font-semibold mb-6 text-gray-900">Review Your Application</h2>
      
      <div className="space-y-6">
        <ApplicationDetailsSection 
          travelerType={travelerType}
          applicationType={applicationType}
          country={country}
        />
        
        <PersonalInfoSection form={form} />

        <PassportInfoSection form={form} />

        <TravelInfoSection form={form} />

        <TravellerInfoSection form={form} />

        <DocumentsSection form={form} />

        <CustomsDeclarationSection form={form} />
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          Please review all information carefully before proceeding to payment. 
          Once submitted, changes may not be possible.
        </p>
      </div>
    </div>
  );
}
