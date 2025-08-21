
import { useNavigate } from "react-router-dom";
import { MobilePageLayout } from "./MobilePageLayout";
import TripInfoStep from "../TripInfoStep";
import { ApplicationFormState } from "@/hooks/useApplicationForm";

interface MobileTripPageProps {
  form: ApplicationFormState;
  onChange: (field: string, value: any) => void;
  country?: string;
}

export const MobileTripPage: React.FC<MobileTripPageProps> = ({
  form,
  onChange,
  country
}) => {
  const navigate = useNavigate();

  const isFormValid = form.purposeOfVisit && form.entryDate && form.exitDate &&
                     form.accommodationAddress && form.arrivalMode && form.departureMode;

  const handleNext = () => {
    if (isFormValid) {
      navigate("/application/traveler");
    }
  };

  const handleBack = () => {
    navigate("/application/contact");
  };

  return (
    <MobilePageLayout
      title="Trip Information"
      subtitle="Provide details about your planned trip to Kenya"
      currentStep={3}
      totalSteps={9}
      onNext={handleNext}
      onBack={handleBack}
      nextButtonText="Continue to Traveler Info"
      nextButtonDisabled={!isFormValid}
    >
      <TripInfoStep form={form} onChange={onChange} country={country} />
    </MobilePageLayout>
  );
};
