
import { useNavigate } from "react-router-dom";
import { MobilePageLayout } from "./MobilePageLayout";
import SelfieStep from "../SelfieStep";
import { ApplicationFormState } from "@/hooks/useApplicationForm";

interface MobileSelfiePageProps {
  form: ApplicationFormState;
  onChange: (field: string, value: File | null) => void;
}

export const MobileSelfiePage: React.FC<MobileSelfiePageProps> = ({
  form,
  onChange
}) => {
  const navigate = useNavigate();

  const isFormValid = form.selfieDoc !== null;

  const handleNext = () => {
    if (isFormValid) {
      navigate("/application/contact");
    }
  };

  const handleBack = () => {
    navigate("/application/passport");
  };

  return (
    <MobilePageLayout
      title="Selfie Verification"
      subtitle="Upload a clear photo of yourself or take a selfie for verification"
      currentStep={1}
      totalSteps={9}
      onNext={handleNext}
      onBack={handleBack}
      nextButtonText="Continue to Contact Info"
      nextButtonDisabled={!isFormValid}
    >
      <SelfieStep form={form} onChange={onChange} />
    </MobilePageLayout>
  );
};
