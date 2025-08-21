
import { BaseModal } from "./BaseModal";
import { BottomSheetModal } from "./BottomSheetModal";
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
  isMobile?: boolean;
}

export const TripModal: React.FC<TripModalProps> = ({
  isOpen,
  onClose,
  onNext,
  onBack,
  form,
  onChange,
  originCountry,
  isMobile = false
}) => {
  if (!isOpen) return null;

  const isFormValid = form.purposeOfVisit && form.entryDate && form.exitDate && 
                     form.arrivalMode && form.departureMode && form.accommodationAddress;

  const progressSteps = getProgressSteps(3);

  const modalProps = {
    title: "Trip Information",
    subtitle: `Provide details about your trip from ${originCountry} to Kenya`,
    onClose,
    onBack,
    onNext,
    nextButtonText: "Continue to Traveler Info",
    nextButtonDisabled: !isFormValid,
    className: "max-w-7xl",
    showProgressBar: true,
    progressSteps
  };

  const ModalComponent = isMobile ? BottomSheetModal : BaseModal;

  return (
    <ModalComponent {...modalProps}>
      <div className="space-y-6 sm:space-y-8">
        <TripInfoStep 
          form={form} 
          onChange={onChange} 
          country="Kenya"
        />
      </div>
    </ModalComponent>
  );
};
