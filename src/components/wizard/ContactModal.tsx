
import { BaseModal } from "./BaseModal";
import ContactInfoStep from "./ContactInfoStep";
import { ApplicationFormState } from "@/hooks/useApplicationForm";
import { getProgressSteps } from "./ModalProgressSteps";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onBack: () => void;
  form: ApplicationFormState;
  onChange: (field: string, value: string) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  onNext,
  onBack,
  form,
  onChange
}) => {
  if (!isOpen) return null;

  const isFormValid = form.fullName && form.email && form.phone && 
                     form.homeAddress && form.occupation;

  const progressSteps = getProgressSteps(2);

  return (
    <BaseModal
      title="Contact Information"
      subtitle="Provide your personal contact details and occupation information"
      onClose={onClose}
      onBack={onBack}
      onNext={onNext}
      nextButtonText="Continue to Trip Info"
      nextButtonDisabled={!isFormValid}
      className="max-w-7xl"
      showProgressBar={true}
      progressSteps={progressSteps}
    >
      <div className="space-y-8 pb-4">
        <ContactInfoStep form={form} onChange={onChange} />
      </div>
    </BaseModal>
  );
};
