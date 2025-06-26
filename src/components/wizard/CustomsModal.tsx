
import { BaseModal } from "./BaseModal";
import CustomsDeclarationStep from "./CustomsDeclarationStep";
import { ApplicationFormState } from "@/hooks/useApplicationForm";
import { getProgressSteps } from "./ModalProgressSteps";

interface CustomsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onBack: () => void;
  form: ApplicationFormState;
  onChange: (field: string, value: any) => void;
}

export const CustomsModal: React.FC<CustomsModalProps> = ({
  isOpen,
  onClose,
  onNext,
  onBack,
  form,
  onChange
}) => {
  if (!isOpen) return null;

  const isFormValid = form.customsDeclaration !== null && 
                     form.bringingCurrencyOver5000 !== null;

  const progressSteps = getProgressSteps(5);

  return (
    <BaseModal
      title="Customs Declaration"
      subtitle="Declaration of goods and currency for customs purposes"
      onClose={onClose}
      onBack={onBack}
      onNext={onNext}
      nextButtonText="Continue to Documents"
      nextButtonDisabled={!isFormValid}
      className="max-w-7xl"
      showProgressBar={true}
      progressSteps={progressSteps}
    >
      <div className="space-y-8 pb-4">
        <CustomsDeclarationStep form={form} onChange={onChange} />
      </div>
    </BaseModal>
  );
};
