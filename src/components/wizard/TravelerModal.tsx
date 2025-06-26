
import { BaseModal } from "./BaseModal";
import TravelInfoStep from "./TravelInfoStep";
import { ApplicationFormState } from "@/hooks/useApplicationForm";
import { getProgressSteps } from "./ModalProgressSteps";

interface TravelerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onBack: () => void;
  form: ApplicationFormState;
  onChange: (field: string, value: any) => void;
}

export const TravelerModal: React.FC<TravelerModalProps> = ({
  isOpen,
  onClose,
  onNext,
  onBack,
  form,
  onChange
}) => {
  if (!isOpen) return null;

  const isFormValid = form.tripFinancedByThirdParty !== null && 
                     form.countryOfBirth && form.nationalityAtBirth && 
                     form.convictedInPast5Years !== null && 
                     form.deniedEntryToKenya !== null && form.maritalStatus &&
                     form.previouslyTravelledToKenya !== null;

  const progressSteps = getProgressSteps(4);

  return (
    <BaseModal
      title="Traveler Information"
      subtitle="Answer a few questions related to the traveler"
      onClose={onClose}
      onBack={onBack}
      onNext={onNext}
      nextButtonText="Continue to Documents"
      nextButtonDisabled={!isFormValid}
      className="max-w-7xl"
      showProgressBar={true}
      progressSteps={progressSteps}
    >
      <div className="pb-4">
        <TravelInfoStep 
          form={form} 
          onChange={onChange}
        />
      </div>
    </BaseModal>
  );
};
