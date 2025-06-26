
import { BaseModal } from "./BaseModal";
import TripInfoStep from "./TripInfoStep";
import { ApplicationFormState } from "@/hooks/useApplicationForm";
import { getProgressSteps } from "./ModalProgressSteps";

interface TripModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onBack: () => void;
  form: ApplicationFormState;
  onChange: (field: string, value: any) => void;
  originCountry: string;
}

export const TripModal: React.FC<TripModalProps> = ({
  isOpen,
  onClose,
  onNext,
  onBack,
  form,
  onChange,
  originCountry
}) => {
  if (!isOpen) return null;

  const isFormValid = form.purposeOfVisit && form.entryDate && form.exitDate && 
                     form.arrivalMode && form.departureMode && form.accommodationAddress;

  const progressSteps = getProgressSteps(3);

  return (
    <BaseModal
      title="Trip Information"
      subtitle={`Provide details about your trip from ${originCountry} to Kenya`}
      onClose={onClose}
      onBack={onBack}
      onNext={onNext}
      nextButtonText="Continue to Traveler Info"
      nextButtonDisabled={!isFormValid}
      className="max-w-7xl"
      showProgressBar={true}
      progressSteps={progressSteps}
    >
      <div className="pb-4">
        <TripInfoStep 
          form={form} 
          onChange={onChange} 
          country="Kenya"
        />
      </div>
    </BaseModal>
  );
};
