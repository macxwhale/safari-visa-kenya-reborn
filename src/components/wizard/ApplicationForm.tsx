
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ApplicationStepper from "@/components/ApplicationStepper";
import PassportStep from "./PassportStep";
import SelfieStep from "./SelfieStep";
import ContactInfoStep from "./ContactInfoStep";
import TripInfoStep from "./TripInfoStep";
import TravelInfoStep from "./TravelInfoStep";
import CustomsDeclarationStep from "./CustomsDeclarationStep";
import DocumentsStep from "./DocumentsStep";
import ReviewStep from "./ReviewStep";
import PaymentStep from "./PaymentStep";
import { HelpCircle, X } from "lucide-react";
import { useApplicationForm } from "@/hooks/useApplicationForm";
import { STEP_LABELS } from "./applicationFormConfig";
import { submitApplication } from "@/services/applicationService";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { safeAsync } from "@/utils/asyncHelpers";
import ModalWrapper from "./ModalWrapper";

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

    // Success
    console.log("Application submitted successfully");
    alert("Application submitted successfully!");
    onReset();
    navigate("/dashboard");
  };

  const handleClose = () => {
    console.log("Closing application form");
    navigate("/");
  };

  const renderStepContent = () => {
    const stepComponents = [
      <PassportStep form={form} onChange={handleFormChange} />,
      <SelfieStep form={form} onChange={handleFormChange} />,
      <ContactInfoStep form={form} onChange={handleFormChange} />,
      <TripInfoStep form={form} onChange={handleFormChange} country={country} onNext={goNext} />,
      <TravelInfoStep form={form} onChange={handleFormChange} onNext={goNext} />,
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
      <ModalWrapper className="sm:max-w-7xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 lg:p-8 border-b border-gray-100 flex-shrink-0">
            <div className="flex-1">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                {STEP_LABELS[step]}
              </h1>
              <div className="hidden sm:block mt-2">
                <p className="text-sm text-gray-500">
                  Step {step + 1} of {STEP_LABELS.length}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 hidden sm:flex items-center gap-2 px-3 py-2">
                <HelpCircle className="w-4 h-4" />
                <span className="text-sm">Help</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Main content with sidebar and form */}
          <div className="flex flex-col lg:flex-row flex-1 overflow-hidden min-h-0">
            {/* Left Sidebar - Hidden on mobile, shown on large screens */}
            <div className="hidden lg:block lg:w-80 xl:w-96 bg-gray-50 border-r border-gray-200 overflow-y-auto flex-shrink-0">
              <div className="p-6 xl:p-8">
                <ApplicationStepper currentStep={step} steps={STEP_LABELS} />
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-1 overflow-hidden flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 sm:p-6 lg:p-8 xl:p-12 max-w-4xl mx-auto">
                  {/* Mobile Progress Indicator */}
                  <div className="lg:hidden mb-4 sm:mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm text-gray-500">{step + 1} of {STEP_LABELS.length}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-brand-green h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${((step + 1) / STEP_LABELS.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="h-full">
                    <ErrorBoundary fallback={<div className="text-red-600 p-4 bg-red-50 border border-red-200 rounded-lg">Error loading step content</div>}>
                      {renderStepContent()}
                    </ErrorBoundary>
                  </div>

                  {error && (
                    <div className="text-red-600 text-sm mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      {error}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation - Fixed at bottom - Hide for steps with custom navigation */}
          {![3, 4].includes(step) && ( // Hide for TripInfo (3) and TravelInfo (4) steps
            <div className="fixed bottom-0 left-0 right-0 lg:relative lg:bottom-auto flex justify-between p-4 sm:p-6 lg:p-8 border-t border-gray-100 bg-white gap-4">
              <Button 
                variant="outline" 
                onClick={goBack} 
                disabled={submitting} 
                className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 font-medium border-gray-300 hover:bg-gray-50 text-sm sm:text-base"
              >
                Back
              </Button>
              {step < STEP_LABELS.length - 1 ? (
                <Button 
                  onClick={goNext} 
                  disabled={submitting} 
                  className="bg-brand-green hover:bg-brand-green/90 text-white flex-1 sm:flex-none px-6 sm:px-8 py-2 sm:py-3 font-semibold text-sm sm:text-base"
                >
                  Continue
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit} 
                  disabled={submitting} 
                  className="bg-brand-green hover:bg-brand-green/90 text-white flex-1 sm:flex-none px-6 sm:px-8 py-2 sm:py-3 font-semibold text-sm sm:text-base"
                >
                  {submitting ? "Submitting..." : "Submit Application"}
                </Button>
              )}
            </div>
          )}
        </div>
      </ModalWrapper>
    </ErrorBoundary>
  );
}
