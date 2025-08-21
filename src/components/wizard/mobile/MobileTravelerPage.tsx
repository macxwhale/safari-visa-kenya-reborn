
import { useNavigate } from "react-router-dom";
import { MobilePageLayout } from "./MobilePageLayout";
import TravelInfoStep from "../TravelInfoStep";
import { ApplicationFormState } from "@/hooks/useApplicationForm";

interface MobileTravelerPageProps {
  form: ApplicationFormState;
  onChange: (field: string, value: any) => void;
}

export const MobileTravelerPage: React.FC<MobileTravelerPageProps> = ({
  form,
  onChange
}) => {
  const navigate = useNavigate();

  const isFormValid = form.countryOfBirth && form.nationalityAtBirth && 
                     form.maritalStatus && form.convictedInPast5Years !== null &&
                     form.deniedEntryToKenya !== null && form.previouslyTravelledToKenya !== null;

  const handleNext = () => {
    if (isFormValid) {
      navigate("/application/customs");
    }
  };

  const handleBack = () => {
    navigate("/application/trip");
  };

  return (
    <MobilePageLayout
      title="Traveler Information"
      subtitle="Additional personal information required for your application"
      currentStep={4}
      totalSteps={9}
      onNext={handleNext}
      onBack={handleBack}
      nextButtonText="Continue to Customs"
      nextButtonDisabled={!isFormValid}
    >
      <TravelInfoStep form={form} onChange={onChange} />
    </MobilePageLayout>
  );
};
