import { useState } from "react";
import { BaseModal } from "./BaseModal";
import { BottomSheetModal } from "./BottomSheetModal";
import DocumentsStep from "./DocumentsStep";
import { ApplicationFormState } from "@/hooks/useApplicationForm";
import { getProgressSteps } from "./ModalProgressSteps";
import { submitApplication, autoSaveFormData } from "@/services/applicationService";
import { useToast } from "@/hooks/useToast";
import { Loader2, CheckCircle } from "lucide-react";

interface DocumentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onBack: () => void;
  form: ApplicationFormState;
  onChange: (field: string, value: any) => void;
  onSubmit: () => void;
  isMobile?: boolean;
}

export const DocumentsModal: React.FC<DocumentsModalProps> = ({
  isOpen,
  onClose,
  onNext,
  onBack,
  form,
  onChange,
  onSubmit,
  isMobile = false
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleConfirmAndProceed = async () => {
    console.log("Confirm & Proceed button clicked");
    setIsSubmitting(true);
    setIsSaved(false);

    try {
      await autoSaveFormData(form, 'documents');
      console.log("Form data auto-saved successfully");

      const requiredFields = {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        passport: form.passport,
        nationality: form.nationality,
        entryDate: form.entryDate,
        exitDate: form.exitDate,
        purposeOfVisit: form.purposeOfVisit,
        accommodationAddress: form.accommodationAddress
      };

      const missingFields = Object.entries(requiredFields)
        .filter(([_, value]) => !value || value.trim() === '')
        .map(([key, _]) => key);

      if (missingFields.length > 0) {
        toast({
          title: "Missing Required Information",
          description: `Please complete: ${missingFields.join(', ')}`,
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      console.log("Submitting application to database...");
      await submitApplication(form);
      
      setIsSaved(true);
      console.log("Application submitted successfully");
      
      toast({
        title: "Application Saved Successfully",
        description: "Your details have been saved. Redirecting to payment..."
      });

      setTimeout(() => {
        onSubmit();
      }, 1500);

    } catch (error) {
      console.error("Failed to save application:", error);
      toast({
        title: "Save Failed",
        description: "There was an error saving your application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressSteps = getProgressSteps(6);

  const getButtonContent = () => {
    if (isSubmitting) {
      return (
        <>
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
          Saving Application...
        </>
      );
    }
    
    if (isSaved) {
      return (
        <>
          <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
          Saved! Redirecting...
        </>
      );
    }
    
    return "Confirm & Proceed to Payment";
  };

  const modalProps = {
    title: "Required Documents & Final Review",
    subtitle: "Upload supporting documents and review your application before proceeding to payment",
    onClose,
    onBack,
    onNext: handleConfirmAndProceed,
    nextButtonText: getButtonContent(),
    nextButtonDisabled: isSubmitting || isSaved,
    className: "max-w-7xl",
    showProgressBar: true,
    progressSteps
  };

  const ModalComponent = isMobile ? BottomSheetModal : BaseModal;

  return (
    <ModalComponent {...modalProps}>
      <div className="space-y-8">
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
    </ModalComponent>
  );
};
