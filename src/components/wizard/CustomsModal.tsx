
import { BaseModal } from "./BaseModal";
import { BottomSheetModal } from "./BottomSheetModal";
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
  isMobile?: boolean;
}

export const CustomsModal: React.FC<CustomsModalProps> = ({
  isOpen,
  onClose,
  onNext,
  onBack,
  form,
  onChange,
  isMobile = false
}) => {
  if (!isOpen) return null;

  const isFormValid = form.customsDeclaration !== null && 
                     form.bringingCurrencyOver5000 !== null;

  const progressSteps = getProgressSteps(5);

  const modalProps = {
    title: "Customs Declaration",
    subtitle: "Declaration of goods and currency for customs purposes",
    onClose,
    onBack,
    onNext,
    nextButtonText: "Continue to Documents",
    nextButtonDisabled: !isFormValid,
    className: "max-w-7xl",
    showProgressBar: true,
    progressSteps
  };

  const ModalComponent = isMobile ? BottomSheetModal : BaseModal;

  return (
    <ModalComponent {...modalProps}>
      <div className="space-y-6 sm:space-y-8">
        <CustomsDeclarationStep form={form} onChange={onChange} />
      </div>
    </ModalComponent>
  );
};
