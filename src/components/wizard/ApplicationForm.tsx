
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import ApplicationStepper from "@/components/ApplicationStepper";
import PersonalInfoStep from "./PersonalInfoStep";
import PassportStep from "./PassportStep";
import TravelDetailsStep from "./TravelDetailsStep";
import DocumentsStep from "./DocumentsStep";
import ReviewStep from "./ReviewStep";

const STEP_LABELS = [
  "Traveler Type",
  "Personal Info", 
  "Passport",
  "Travel Details",
  "Documents",
  "Review",
];

interface ApplicationFormProps {
  travelerType: string;
  onReset: () => void;
}

export default function ApplicationForm({ travelerType, onReset }: ApplicationFormProps) {
  const [step, setStep] = useState(1); // Start at step 1 since step 0 is traveler type selection
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    passport: "",
    nationality: "",
    travelFrom: "",
    entryDate: "",
    doc: null as File | null,
  });
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormChange = (field: string, value: string | File | null) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const goNext = () => {
    if (step < STEP_LABELS.length - 1) setStep(s => s + 1);
  };

  const goBack = () => {
    if (step > 1) setStep(s => s - 1);
    else onReset(); // Go back to traveler type selection
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    let doc_url: string | undefined;

    try {
      // 1. Upload document to storage if present
      if (form.doc) {
        const { data, error: uploadError } = await supabase.storage
          .from("eta-documents")
          .upload(`public/${Date.now()}_${form.doc.name}`, form.doc);
        if (uploadError) {
          setError("Failed to upload document: " + uploadError.message);
          setSubmitting(false);
          return;
        }
        doc_url = data?.path;
      }

      // 2. Submit application to DB
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
            doc_url,
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
      case 1:
        return (
          <PersonalInfoStep 
            form={form} 
            onChange={handleFormChange}
          />
        );
      case 2:
        return (
          <PassportStep 
            form={form} 
            onChange={handleFormChange}
          />
        );
      case 3:
        return (
          <TravelDetailsStep 
            form={form} 
            onChange={handleFormChange}
          />
        );
      case 4:
        return (
          <DocumentsStep 
            form={form} 
            onChange={handleFormChange}
          />
        );
      case 5:
        return (
          <ReviewStep 
            travelerType={travelerType}
            form={form}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl bg-white shadow-lg mx-auto mt-12 mb-20 rounded-lg border border-gray-200 p-8 space-y-6 animate-fade-in">
        <ApplicationStepper currentStep={step} steps={STEP_LABELS} />
        <div>{renderStepContent()}</div>
        {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
        <div className="flex justify-between pt-6">
          <Button variant="secondary" onClick={goBack} disabled={submitting}>
            Back
          </Button>
          {step < STEP_LABELS.length - 1 ? (
            <Button onClick={goNext} disabled={submitting}>Next</Button>
          ) : (
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Application"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
