
import { useNavigate } from "react-router-dom";
import { MobilePageLayout } from "./MobilePageLayout";
import PassportStep from "../PassportStep";
import { ApplicationFormState } from "@/hooks/useApplicationForm";

interface MobilePassportPageProps {
  form: ApplicationFormState;
  onChange: (field: string, value: string | File | null) => void;
}

export const MobilePassportPage: React.FC<MobilePassportPageProps> = ({
  form,
  onChange
}) => {
  const navigate = useNavigate();

  const isFormValid = form.passport && form.nationality && form.dateOfBirth && 
                     form.placeOfBirth && form.passportIssueDate && 
                     form.passportExpiryDate && form.fullName;

  const handleNext = () => {
    if (isFormValid) {
      navigate("/application/selfie");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <MobilePageLayout
      title="Passport Information"
      subtitle="Upload your passport document and enter your passport details"
      currentStep={0}
      totalSteps={9}
      onNext={handleNext}
      onBack={handleBack}
      nextButtonText="Continue to Selfie"
      nextButtonDisabled={!isFormValid}
    >
      <PassportStep form={form} onChange={onChange} />
    </MobilePageLayout>
  );
};
