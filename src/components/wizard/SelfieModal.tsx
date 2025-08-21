
import { BaseModal } from "./BaseModal";
import { BottomSheetModal } from "./BottomSheetModal";
import SelfieStep from "./SelfieStep";
import { ApplicationFormState } from "@/hooks/useApplicationForm";
import { getProgressSteps } from "./ModalProgressSteps";

interface SelfieModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onBack: () => void;
  form: ApplicationFormState;
  onChange: (field: string, value: File | null) => void;
  isMobile?: boolean;
}

export const SelfieModal: React.FC<SelfieModalProps> = ({
  isOpen,
  onClose,
  onNext,
  onBack,
  form,
  onChange,
  isMobile = false
}) => {
  if (!isOpen) return null;

  const isFormValid = form.selfieDoc !== null;
  const progressSteps = getProgressSteps(1);

  const modalProps = {
    title: "Selfie Verification",
    subtitle: "Upload a clear photo of yourself or take a selfie for verification",
    onClose,
    onBack,
    onNext,
    nextButtonText: "Continue to Contact Info",
    nextButtonDisabled: !isFormValid,
    className: "max-w-7xl",
    showProgressBar: true,
    progressSteps
  };

  const ModalComponent = isMobile ? BottomSheetModal : BaseModal;

  return (
    <ModalComponent {...modalProps}>
      <div className="space-y-6 sm:space-y-8">
        <SelfieStep form={form} onChange={onChange} />
      </div>
    </ModalComponent>
  );
};
