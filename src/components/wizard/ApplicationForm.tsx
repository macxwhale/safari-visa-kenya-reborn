import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import ApplicationStepper from "@/components/ApplicationStepper";
import PersonalInfoStep from "./PersonalInfoStep";
import PassportStep from "./PassportStep";
import SelfieStep from "./SelfieStep";
import ContactInfoStep from "./ContactInfoStep";
import TripInfoStep from "./TripInfoStep";
import TravelInfoStep from "./TravelInfoStep";
import CustomsDeclarationStep from "./CustomsDeclarationStep";
import DocumentsStep from "./DocumentsStep";
import ReviewStep from "./ReviewStep";
import PaymentStep from "./PaymentStep";
import { HelpCircle } from "lucide-react";

const STEP_LABELS = [
  "Passport Information",
  "Selfie or Photo", 
  "Contact Information",
  "Trip Information",
  "Travel Information",
  "Customs Declaration",
  "Required Documents",
  "Confirm and Proceed",
  "Payment",
];

interface ApplicationFormProps {
  travelerType: string;
  applicationType?: string;
  country?: string;
  onReset: () => void;
}

export default function ApplicationForm({ travelerType, applicationType, country, onReset }: ApplicationFormProps) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    passportDoc: null as File | null,
    selfieDoc: null as File | null,
    fullName: "",
    email: "",
    phone: "",
    passport: "",
    nationality: "",
    dateOfBirth: "",
    placeOfBirth: "",
    passportIssueDate: "",
    passportExpiryDate: "",
    purposeOfVisit: "",
    accommodationAddress: "",
    homeAddress: "",
    occupation: "",
    contactInKenya: "",
    travelFrom: country || "",
    entryDate: "",
    exitDate: "",
    flightNumber: "",
    customsDeclaration: false,
    additionalDocs: [] as File[],
  });
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormChange = (field: string, value: string | File | File[] | boolean | null) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const goNext = () => {
    if (step < STEP_LABELS.length - 1) setStep(s => s + 1);
  };

  const goBack = () => {
    if (step > 0) setStep(s => s - 1);
    else onReset();
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    let passport_doc_url: string | undefined;
    let selfie_doc_url: string | undefined;

    try {
      if (form.passportDoc) {
        const { data, error: uploadError } = await supabase.storage
          .from("eta-documents")
          .upload(`public/${Date.now()}_passport_${form.passportDoc.name}`, form.passportDoc);
        if (uploadError) {
          setError("Failed to upload passport document: " + uploadError.message);
          setSubmitting(false);
          return;
        }
        passport_doc_url = data?.path;
      }

      if (form.selfieDoc) {
        const { data, error: uploadError } = await supabase.storage
          .from("eta-documents")
          .upload(`public/${Date.now()}_selfie_${form.selfieDoc.name}`, form.selfieDoc);
        if (uploadError) {
          setError("Failed to upload selfie document: " + uploadError.message);
          setSubmitting(false);
          return;
        }
        selfie_doc_url = data?.path;
      }

      const { error: insertError } = await supabase
        .from("eta_applications")
        .insert([
          {
            user_id: null,
            full_name: form.fullName,
            email: form.email,
            passport: form.passport,
            nationality: form.nationality,
            travel_from: form.travelFrom,
            entry_date: form.entryDate,
            doc_url: passport_doc_url,
          },
        ]);
      if (insertError) {
        setError("Submission failed: " + insertError.message);
        setSubmitting(false);
        return;
      }

      alert("Application submitted!");
      onReset();
      navigate("/dashboard");
    } catch (e: any) {
      setError("Unexpected error: " + (e.message || e.toString()));
    } finally {
      setSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <PassportStep 
            form={form} 
            onChange={handleFormChange}
          />
        );
      case 1:
        return (
          <SelfieStep 
            form={form} 
            onChange={handleFormChange}
          />
        );
      case 2:
        return (
          <ContactInfoStep 
            form={form} 
            onChange={handleFormChange}
          />
        );
      case 3:
        return (
          <TripInfoStep 
            form={form} 
            onChange={handleFormChange}
          />
        );
      case 4:
        return (
          <TravelInfoStep 
            form={form} 
            onChange={handleFormChange}
          />
        );
      case 5:
        return (
          <CustomsDeclarationStep 
            form={form} 
            onChange={handleFormChange}
          />
        );
      case 6:
        return (
          <DocumentsStep 
            form={form} 
            onChange={handleFormChange}
          />
        );
      case 7:
        return (
          <ReviewStep 
            travelerType={travelerType}
            applicationType={applicationType}
            country={country}
            form={form}
          />
        );
      case 8:
        return (
          <PaymentStep 
            form={form} 
            onChange={handleFormChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl bg-white shadow-lg mx-auto mt-12 mb-20 rounded-lg border border-gray-200 overflow-hidden animate-fade-in">
        <div className="flex">
          {/* Left Sidebar */}
          <div className="w-80 bg-gray-50 border-r border-gray-200 p-6">
            <ApplicationStepper currentStep={step} steps={STEP_LABELS} />
          </div>
          
          {/* Main Content */}
          <div className="flex-1 p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-gray-900">
                {STEP_LABELS[step]}
              </h1>
              <Button variant="ghost" size="sm" className="text-gray-600">
                <HelpCircle className="w-4 h-4 mr-2" />
                Help
              </Button>
            </div>

            {/* Step Content */}
            <div className="mb-8">
              {renderStepContent()}
            </div>

            {error && <div className="text-red-600 text-sm mb-6">{error}</div>}

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
  );
}
