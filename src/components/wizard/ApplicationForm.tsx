import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PassportStep from "./PassportStep";
import SelfieStep from "./SelfieStep";
import ContactInfoStep from "./ContactInfoStep";
import TripInfoStep from "./TripInfoStep";
import TravelInfoStep from "./TravelInfoStep";
import CustomsDeclarationStep from "./CustomsDeclarationStep";
import DocumentsStep from "./DocumentsStep";
import ReviewStep from "./ReviewStep";
import PaymentStep from "./PaymentStep";
import { useApplicationForm } from "@/hooks/useApplicationForm";
import { STEP_LABELS } from "./applicationFormConfig";
import { submitApplication } from "@/services/applicationService";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { safeAsync } from "@/utils/asyncHelpers";
import ModalWrapper from "./ModalWrapper";
import { ApplicationFormHeader } from "./ApplicationFormHeader";
import { ApplicationFormContent } from "./ApplicationFormContent";
import { ApplicationFormNavigation } from "./ApplicationFormNavigation";
import { ModalManager } from "./ModalManager";
import { ProgressIndicator } from "./ProgressIndicator";
import { useAutoSave } from "@/hooks/useAutoSave";
import { ConfirmationDialog } from "./ConfirmationDialog";

interface ApplicationFormProps {
  travelerType: string;
  applicationType?: string;
  country?: string;
  onReset: () => void;
}

export default function ApplicationForm({ travelerType, applicationType, country, onReset }: ApplicationFormProps) {
  const [step, setStep] = useState(0);
  const { form, handleFormChange } = useApplicationForm(country || "");
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // Track completed steps
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(
    new Array(STEP_LABELS.length).fill(false)
  );

  // Auto-save functionality
  useAutoSave({
    data: form,
    onSave: (data) => {
      // Save to localStorage as backup
      localStorage.setItem('visa-application-draft', JSON.stringify({
        data,
        step,
        timestamp: Date.now()
      }));
    },
    enabled: step < 7 // Don't auto-save on review/payment steps
  });

  // Load draft on mount
  useEffect(() => {
    const draft = localStorage.getItem('visa-application-draft');
    if (draft) {
      try {
        const { data, step: savedStep, timestamp } = JSON.parse(draft);
        // Only restore if less than 24 hours old
        if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
          // Show confirmation to restore draft
          // For now, just console log - can be enhanced later
          console.log('Draft found, can be restored:', { savedStep, timestamp });
        }
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  const goNext = () => {
    if (step < STEP_LABELS.length - 1) {
      setCompletedSteps(prev => {
        const newCompleted = [...prev];
        newCompleted[step] = true;
        return newCompleted;
      });
      setStep(s => s + 1);
    }
  };

  const goBack = () => {
    if (step > 0) {
      setStep(s => s - 1);
    } else {
      setShowExitConfirm(true);
    }
  };

  const handleExit = () => {
    // Clear draft when explicitly exiting
    localStorage.removeItem('visa-application-draft');
    onReset();
    setShowExitConfirm(false);
  };

  const handleClose = () => {
    if (step > 0) {
      setShowExitConfirm(true);
    } else {
      navigate("/");
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    
    const { error: submitError, data: submissionData } = await safeAsync(
      () => submitApplication(form),
      "Failed to submit application"
    );

    if (submitError) {
      setError(submitError);
      setSubmitting(false);
      return;
    }

    if (submissionData && submissionData.id) {
      setApplicationId(submissionData.id);
    }

    // Clear draft on successful submission
    localStorage.removeItem('visa-application-draft');
    setStep(8); // Payment step
    setSubmitting(false);
  };

  const useModalForStep = (stepIndex: number) => {
    return [0, 1, 2, 3, 4, 5, 6].includes(stepIndex);
  };

  const renderStepContent = () => {
    const stepComponents = [
      <PassportStep form={form} onChange={handleFormChange} />,
      <SelfieStep form={form} onChange={handleFormChange} />,
      <ContactInfoStep form={form} onChange={handleFormChange} />,
      <TripInfoStep form={form} onChange={handleFormChange} country={country} />,
      <TravelInfoStep form={form} onChange={handleFormChange} />,
      <CustomsDeclarationStep form={form} onChange={handleFormChange} />,
      <DocumentsStep form={form} onChange={handleFormChange} />,
      <ReviewStep 
        travelerType={travelerType}
        applicationType={applicationType}
        country={country}
        form={form}
      />,
      <PaymentStep form={form} onChange={handleFormChange} applicationId={applicationId} />
    ];

    return stepComponents[step] || null;
  };

  return (
    <ErrorBoundary>
      {/* Progress Indicator */}
      <ProgressIndicator
        currentStep={step}
        totalSteps={STEP_LABELS.length}
        completedSteps={completedSteps}
        stepLabels={STEP_LABELS}
      />

      <ModalManager
        currentStep={step}
        form={form}
        onChange={handleFormChange}
        onNext={goNext}
        onBack={goBack}
        onClose={handleClose}
        onSubmit={handleSubmit}
        originCountry={form.travelFrom || country || ""}
      />

      {!useModalForStep(step) && (
        <ModalWrapper className="sm:max-w-7xl">
          <div className="flex flex-col h-full">
            <ApplicationFormHeader
              currentStep={step}
              totalSteps={STEP_LABELS.length}
              stepLabel={STEP_LABELS[step]}
              onClose={handleClose}
            />

            <ApplicationFormContent
              currentStep={step}
              stepLabels={STEP_LABELS}
              error={error}
            >
              {renderStepContent()}
            </ApplicationFormContent>

            <ApplicationFormNavigation
              currentStep={step}
              totalSteps={STEP_LABELS.length}
              submitting={submitting}
              onNext={goNext}
              onBack={goBack}
              onSubmit={handleSubmit}
            />
          </div>
        </ModalWrapper>
      )}

      {/* Exit Confirmation Dialog */}
      <ConfirmationDialog
        open={showExitConfirm}
        onOpenChange={setShowExitConfirm}
        title="Exit Application?"
        description="Your progress will be saved as a draft. You can continue later from where you left off."
        confirmText="Exit"
        cancelText="Continue Application"
        onConfirm={handleExit}
      />
    </ErrorBoundary>
  );
}
