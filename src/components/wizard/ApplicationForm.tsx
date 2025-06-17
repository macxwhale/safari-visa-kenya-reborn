
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
      <TripInfoStep form={form} onChange={handleFormChange} />,
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
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        {/* Enhanced Modal overlay with proper blur */}
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
          style={{ zIndex: 9998 }}
        />
        
        {/* Modal content with enhanced z-index */}
        <div 
          className="relative bg-white rounded-lg shadow-2xl max-w-6xl w-full mx-auto max-h-[90vh] overflow-hidden"
          style={{ zIndex: 9999 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-900">
              {STEP_LABELS[step]}
            </h1>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-gray-600">
                <HelpCircle className="w-4 h-4 mr-2" />
                Help
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleClose}
                className="text-gray-600"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Main content with sidebar and form */}
          <div className="flex max-h-[calc(90vh-140px)]">
            {/* Left Sidebar */}
            <div className="w-80 bg-gray-50 border-r border-gray-200 p-6 overflow-y-auto">
              <ApplicationStepper currentStep={step} steps={STEP_LABELS} />
            </div>
            
            {/* Main Content */}
            <div className="flex-1 p-8 overflow-y-auto">
              {/* Step Content */}
              <div className="mb-8">
                <ErrorBoundary fallback={<div className="text-red-600">Error loading step content</div>}>
                  {renderStepContent()}
                </ErrorBoundary>
              </div>

              {error && (
                <div className="text-red-600 text-sm mb-6 p-3 bg-red-50 border border-red-200 rounded">
                  {error}
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-6 border-t border-gray-200">
                <Button variant="outline" onClick={goBack} disabled={submitting}>
                  Back
                </Button>
                {step < STEP_LABELS.length - 1 ? (
                  <Button onClick={goNext} disabled={submitting} className="bg-green-600 hover:bg-green-700">
                    Continue
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={submitting} className="bg-green-600 hover:bg-green-700">
                    {submitting ? "Submitting..." : "Submit Application"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
