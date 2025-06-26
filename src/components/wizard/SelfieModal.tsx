
import { BaseModal } from "./BaseModal";
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
}

export const SelfieModal: React.FC<SelfieModalProps> = ({
  isOpen,
  onClose,
  onNext,
  onBack,
  form,
  onChange
}) => {
  if (!isOpen) return null;

  const isFormValid = form.selfieDoc !== null;
  const progressSteps = getProgressSteps(1);

  return (
    <BaseModal
      title="Selfie Verification"
      subtitle="Upload a clear photo of yourself or take a selfie for verification"
      onClose={onClose}
      onBack={onBack}
      onNext={onNext}
      nextButtonText="Continue to Contact Info"
      nextButtonDisabled={!isFormValid}
      className="max-w-7xl"
      showProgressBar={true}
      progressSteps={progressSteps}
    >
      <div className="space-y-8 pb-4">
        <SelfieStep form={form} onChange={onChange} />
      </div>
    </BaseModal>
  );
};
