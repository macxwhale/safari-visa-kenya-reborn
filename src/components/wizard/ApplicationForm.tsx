
import { useState } from "react";
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

  console.log("ApplicationForm rendered with:", { travelerType, applicationType, country });

  const goNext = () => {
    console.log("Going to next step from:", step);
    if (step < STEP_LABELS.length - 1) setStep(s => s + 1);
  };

  const goBack = () => {
    console.log("Going back from step:", step);
    if (step > 0) setStep(s => s - 1);
    else {
      console.log("Resetting application form");
      onReset();
    }
  };

  const handleSubmit = async () => {
    console.log("Submitting application with form data:", form);
    setSubmitting(true);
    setError(null);
    
    const { data, error: submitError } = await safeAsync(
      () => submitApplication(form),
      "Failed to submit application"
    );

    if (submitError) {
      console.error("Application submission failed:", submitError);
      setError(submitError);
      setSubmitting(false);
      return;
    }

    console.log("Application submitted successfully");
    alert("Application submitted successfully!");
    onReset();
    navigate("/dashboard");
  };

  const handleClose = () => {
    console.log("Closing application form");
    navigate("/");
  };

  // Use modals for specific steps
  const useModalForStep = (stepIndex: number) => {
    return [0, 3, 4].includes(stepIndex); // Passport, Trip Info, Traveler Info
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
      <PaymentStep form={form} onChange={handleFormChange} />
    ];

    return stepComponents[step] || null;
  };

  return (
    <ErrorBoundary>
      {/* Modal System for specific steps */}
      <ModalManager
        currentStep={step}
        form={form}
        onChange={handleFormChange}
        onNext={goNext}
        onBack={goBack}
        onClose={handleClose}
        originCountry={form.travelFrom || country || ""}
      />

      {/* Regular Modal for other steps */}
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
    </ErrorBoundary>
  );
}
