
import { ApplicationFormState } from "@/hooks/useApplicationForm";
import { PassportModal } from "./PassportModal";
import { SelfieModal } from "./SelfieModal";
import { ContactModal } from "./ContactModal";
import { TripModal } from "./TripModal";
import { TravelerModal } from "./TravelerModal";
import { CustomsModal } from "./CustomsModal";
import { DocumentsModal } from "./DocumentsModal";
import { useIsMobile } from "@/hooks/use-mobile";

interface ModalManagerProps {
  currentStep: number;
  form: ApplicationFormState;
  onChange: (field: string, value: any) => void;
  onNext: () => void;
  onBack: () => void;
  onClose: () => void;
  onSubmit: () => void;
  originCountry: string;
}

export const ModalManager: React.FC<ModalManagerProps> = ({
  currentStep,
  form,
  onChange,
  onNext,
  onBack,
  onClose,
  onSubmit,
  originCountry
}) => {
  const isMobile = useIsMobile();

  return (
    <>
      <PassportModal
        isOpen={currentStep === 0}
        onClose={onClose}
        onNext={onNext}
        onBack={onBack}
        form={form}
        onChange={onChange}
        isMobile={isMobile}
      />
      
      <SelfieModal
        isOpen={currentStep === 1}
        onClose={onClose}
        onNext={onNext}
        onBack={onBack}
        form={form}
        onChange={onChange}
        isMobile={isMobile}
      />
      
      <ContactModal
        isOpen={currentStep === 2}
        onClose={onClose}
        onNext={onNext}
        onBack={onBack}
        form={form}
        onChange={onChange}
        isMobile={isMobile}
      />
      
      <TripModal
        isOpen={currentStep === 3}
        onClose={onClose}
        onNext={onNext}
        onBack={onBack}
        form={form}
        onChange={onChange}
        originCountry={originCountry}
        isMobile={isMobile}
      />
      
      <TravelerModal
        isOpen={currentStep === 4}
        onClose={onClose}
        onNext={onNext}
        onBack={onBack}
        form={form}
        onChange={onChange}
        isMobile={isMobile}
      />

      <CustomsModal
        isOpen={currentStep === 5}
        onClose={onClose}
        onNext={onNext}
        onBack={onBack}
        form={form}
        onChange={onChange}
        isMobile={isMobile}
      />

      <DocumentsModal
        isOpen={currentStep === 6}
        onClose={onClose}
        onNext={onNext}
        onBack={onBack}
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        isMobile={isMobile}
      />
    </>
  );
};
