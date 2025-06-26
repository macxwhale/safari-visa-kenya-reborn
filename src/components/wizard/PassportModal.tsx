
import { BaseModal } from "./BaseModal";
import PassportStep from "./PassportStep";
import { ApplicationFormState } from "@/hooks/useApplicationForm";

interface PassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onBack: () => void;
  form: ApplicationFormState;
  onChange: (field: string, value: string | File | null) => void;
}

export const PassportModal: React.FC<PassportModalProps> = ({
  isOpen,
  onClose,
  onNext,
  onBack,
  form,
  onChange
}) => {
  if (!isOpen) return null;

  const isFormValid = form.passport && form.nationality && form.dateOfBirth && 
                     form.placeOfBirth && form.passportIssueDate && 
                     form.passportExpiryDate && form.fullName;

  const progressSteps = [
    { label: "Passport Information", completed: false, current: true },
    { label: "Selfie Verification", completed: false, current: false },
    { label: "Contact Information", completed: false, current: false },
    { label: "Trip Information", completed: false, current: false },
    { label: "Traveler Information", completed: false, current: false },
    { label: "Documents & Review", completed: false, current: false },
    { label: "Payment", completed: false, current: false }
  ];

  return (
    <BaseModal
      title="Passport Information"
      subtitle="Upload your passport document and enter your passport details"
      onClose={onClose}
      onBack={onBack}
      onNext={onNext}
      nextButtonText="Continue to Selfie"
      nextButtonDisabled={!isFormValid}
      className="max-w-7xl"
      showProgressBar={true}
      progressSteps={progressSteps}
    >
      <div className="space-y-8 pb-4">
        <PassportStep form={form} onChange={onChange} />
      </div>
    </BaseModal>
  );
};
