
import { BaseModal } from "./BaseModal";
import TripInfoStep from "./TripInfoStep";
import { ApplicationFormState } from "@/hooks/useApplicationForm";

interface TripModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onBack: () => void;
  form: ApplicationFormState;
  onChange: (field: string, value: any) => void;
  originCountry: string;
}

export const TripModal: React.FC<TripModalProps> = ({
  isOpen,
  onClose,
  onNext,
  onBack,
  form,
  onChange,
  originCountry
}) => {
  if (!isOpen) return null;

  const isFormValid = form.purposeOfVisit && form.entryDate && form.exitDate && 
                     form.arrivalMode && form.departureMode && form.accommodationAddress;

  const progressSteps = [
    { label: "Passport Information", completed: true, current: false },
    { label: "Selfie Verification", completed: true, current: false },
    { label: "Contact Information", completed: true, current: false },
    { label: "Trip Information", completed: false, current: true },
    { label: "Traveler Information", completed: false, current: false },
    { label: "Documents & Review", completed: false, current: false },
    { label: "Payment", completed: false, current: false }
  ];

  return (
    <BaseModal
      title="Trip Information"
      subtitle={`Provide details about your trip from ${originCountry} to Kenya`}
      onClose={onClose}
      onBack={onBack}
      onNext={onNext}
      nextButtonText="Continue to Traveler Info"
      nextButtonDisabled={!isFormValid}
      className="max-w-7xl"
      showProgressBar={true}
      progressSteps={progressSteps}
    >
      <div className="pb-4">
        <TripInfoStep 
          form={form} 
          onChange={onChange} 
          country="Kenya"
        />
      </div>
    </BaseModal>
  );
};
