
import { useState } from "react";
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

  return (
    <BaseModal
      title="Passport Information"
      subtitle="Upload your passport document and enter your passport details"
      onClose={onClose}
      onBack={onBack}
      onNext={onNext}
      nextButtonText="Continue to Selfie"
      nextButtonDisabled={!isFormValid}
      className="max-w-5xl"
    >
      <div className="space-y-8 pb-4">
        <PassportStep form={form} onChange={onChange} />
      </div>
    </BaseModal>
  );
};
