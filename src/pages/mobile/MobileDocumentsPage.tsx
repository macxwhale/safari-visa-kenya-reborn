
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileDocumentsPage as MobileDocumentsPageComponent } from "@/components/wizard/mobile/MobileDocumentsPage";
import { useMobileApplication } from "@/contexts/MobileApplicationContext";
import { submitApplication } from "@/services/applicationService";
import { safeAsync } from "@/utils/asyncHelpers";

export default function MobileDocumentsPage() {
  const { form, handleFormChange } = useMobileApplication();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    
    const { error: submitError, data: submissionData } = await safeAsync(
      () => submitApplication(form),
      "Failed to submit application"
    );

    if (submitError) {
      console.error("Submission error:", submitError);
      setSubmitting(false);
      return;
    }

    // Clear draft on successful submission
    localStorage.removeItem('visa-application-draft');
    
    if (submissionData && submissionData.id) {
      // Navigate to payment with application ID
      navigate(`/application/payment?id=${submissionData.id}`);
    } else {
      navigate("/application/review");
    }
    
    setSubmitting(false);
  };
  
  return (
    <MobileDocumentsPageComponent 
      form={form} 
      onChange={handleFormChange}
      onSubmit={handleSubmit}
    />
  );
}
