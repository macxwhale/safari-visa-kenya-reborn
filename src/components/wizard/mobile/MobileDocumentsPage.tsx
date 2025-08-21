
import { useNavigate } from "react-router-dom";
import { MobilePageLayout } from "./MobilePageLayout";
import DocumentsStep from "../DocumentsStep";
import { ApplicationFormState } from "@/hooks/useApplicationForm";

interface MobileDocumentsPageProps {
  form: ApplicationFormState;
  onChange: (field: string, value: any) => void;
  onSubmit: () => void;
}

export const MobileDocumentsPage: React.FC<MobileDocumentsPageProps> = ({
  form,
  onChange,
  onSubmit
}) => {
  const navigate = useNavigate();

  const handleNext = () => {
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
      nextButtonText="Continue to Review"
    >
      <DocumentsStep form={form} onChange={onChange} />
    </MobilePageLayout>
  );
};
