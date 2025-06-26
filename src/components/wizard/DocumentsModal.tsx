
import { BaseModal } from "./BaseModal";
import DocumentsStep from "./DocumentsStep";
import { ApplicationFormState } from "@/hooks/useApplicationForm";
import { getProgressSteps } from "./ModalProgressSteps";

interface DocumentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onBack: () => void;
  form: ApplicationFormState;
  onChange: (field: string, value: any) => void;
  onSubmit: () => void;
}

export const DocumentsModal: React.FC<DocumentsModalProps> = ({
  isOpen,
  onClose,
  onNext,
  onBack,
  form,
  onChange,
  onSubmit
}) => {
  if (!isOpen) return null;

  const progressSteps = getProgressSteps(5);

  return (
    <BaseModal
      title="Required Documents & Final Review"
      subtitle="Upload supporting documents and review your application before proceeding to payment"
      onClose={onClose}
      onBack={onBack}
      onNext={onSubmit}
      nextButtonText="Confirm & Proceed to Payment"
      nextButtonDisabled={false}
      className="max-w-7xl"
      showProgressBar={true}
      progressSteps={progressSteps}
    >
      <div className="space-y-8 pb-4">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-amber-900 mb-2">Final Checkpoint</h3>
          <p className="text-sm text-amber-700">
            Please review all information carefully. Once you proceed to payment, changes cannot be made without starting a new application.
          </p>
        </div>
        
        <DocumentsStep form={form} onChange={onChange} />
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-medium text-green-900 mb-2">Ready to Submit</h4>
          <p className="text-sm text-green-700">
            Your application will be saved securely and you'll be redirected to complete the payment process.
          </p>
        </div>
      </div>
    </BaseModal>
  );
};
