
import { BaseModal } from "./BaseModal";
import { MobileBaseModal } from "./MobileBaseModal";
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
  isMobile?: boolean;
}

export const TravelerModal: React.FC<TravelerModalProps> = ({
  isOpen,
  onClose,
  onNext,
  onBack,
  form,
  onChange,
  isMobile = false
}) => {
  if (!isOpen) return null;

  const isFormValid = form.tripFinancedByThirdParty !== null && 
                     form.countryOfBirth && form.nationalityAtBirth && 
                     form.convictedInPast5Years !== null && 
                     form.deniedEntryToKenya !== null && form.maritalStatus &&
                     form.previouslyTravelledToKenya !== null;

  const progressSteps = getProgressSteps(4);

  const modalProps = {
    title: "Traveler Information",
    subtitle: "Answer a few questions related to the traveler",
    onClose,
    onBack,
    onNext,
    nextButtonText: "Continue to Customs",
    nextButtonDisabled: !isFormValid,
    className: "max-w-7xl",
    showProgressBar: true,
    progressSteps
  };

  const ModalComponent = isMobile ? MobileBaseModal : BaseModal;

  return (
    <ModalComponent {...modalProps}>
      <div className="pb-4">
        <TravelInfoStep 
          form={form} 
          onChange={onChange}
        />
      </div>
    </ModalComponent>
  );
};
