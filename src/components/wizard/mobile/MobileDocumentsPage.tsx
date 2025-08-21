
import { useNavigate } from "react-router-dom";
import { MobilePageLayout } from "./MobilePageLayout";
import DocumentsStep from "../DocumentsStep";
import { ApplicationFormState } from "@/hooks/useApplicationForm";

interface MobileDocumentsPageProps {
  form: ApplicationFormState;
  onChange: (field: string, value: any) => void;
  onSubmit: () => void;
  submitting?: boolean;
}

export const MobileDocumentsPage: React.FC<MobileDocumentsPageProps> = ({
  form,
  onChange,
  onSubmit,
  submitting = false
}) => {
  const navigate = useNavigate();

  const handleNext = () => {
    console.log("Documents page - Continue button clicked");
    onSubmit();
  };

  const handleBack = () => {
    navigate("/application/customs");
  };

  return (
    <MobilePageLayout
      title="Required Documents"
      subtitle="Upload any additional required documents for your application"
      currentStep={6}
      totalSteps={9}
      onNext={handleNext}
      onBack={handleBack}
      nextButtonText={submitting ? "Submitting..." : "Continue to Review"}
      nextButtonDisabled={submitting}
    >
      <DocumentsStep form={form} onChange={onChange} />
    </MobilePageLayout>
  );
};
