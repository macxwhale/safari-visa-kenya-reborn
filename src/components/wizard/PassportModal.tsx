
import { BaseModal } from "./BaseModal";
import { BottomSheetModal } from "./BottomSheetModal";
import PassportStep from "./PassportStep";
import { ApplicationFormState } from "@/hooks/useApplicationForm";
import { getProgressSteps } from "./ModalProgressSteps";

interface PassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onBack: () => void;
  form: ApplicationFormState;
  onChange: (field: string, value: string | File | null) => void;
  isMobile?: boolean;
}

export const PassportModal: React.FC<PassportModalProps> = ({
  isOpen,
  onClose,
  onNext,
  onBack,
  form,
  onChange,
  isMobile = false
}) => {
  if (!isOpen) return null;

  const isFormValid = form.passport && form.nationality && form.dateOfBirth && 
                     form.placeOfBirth && form.passportIssueDate && 
                     form.passportExpiryDate && form.fullName;

  const progressSteps = getProgressSteps(0);

  const modalProps = {
    title: "Passport Information",
    subtitle: "Upload your passport document and enter your passport details",
    onClose,
    onBack,
    onNext,
    nextButtonText: "Continue to Selfie",
    nextButtonDisabled: !isFormValid,
    className: "max-w-7xl",
    showProgressBar: true,
    progressSteps
  };

  const ModalComponent = isMobile ? BottomSheetModal : BaseModal;

  return (
    <ModalComponent {...modalProps}>
      <div className="space-y-6 sm:space-y-8">
        <PassportStep form={form} onChange={onChange} />
      </div>
    </ModalComponent>
  );
};
