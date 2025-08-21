
import { useNavigate } from "react-router-dom";
import { MobilePageLayout } from "./MobilePageLayout";
import ContactInfoStep from "../ContactInfoStep";
import { ApplicationFormState } from "@/hooks/useApplicationForm";

interface MobileContactPageProps {
  form: ApplicationFormState;
  onChange: (field: string, value: string) => void;
}

export const MobileContactPage: React.FC<MobileContactPageProps> = ({
  form,
  onChange
}) => {
  const navigate = useNavigate();

  const isFormValid = form.fullName && form.email && form.phone && 
                     form.homeAddress && form.occupation;

  const handleNext = () => {
    if (isFormValid) {
      navigate("/application/trip");
    }
  };

  const handleBack = () => {
    navigate("/application/selfie");
  };

  return (
    <MobilePageLayout
      title="Contact Information"
      subtitle="Provide your personal contact details and occupation information"
      currentStep={2}
      totalSteps={9}
      onNext={handleNext}
      onBack={handleBack}
      nextButtonText="Continue to Trip Info"
      nextButtonDisabled={!isFormValid}
    >
      <ContactInfoStep form={form} onChange={onChange} />
    </MobilePageLayout>
  );
};
