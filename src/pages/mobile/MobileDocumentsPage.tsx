
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
    if (submitting) return; // Prevent double submission
    
    setSubmitting(true);
    console.log("Starting application submission...");
    
    try {
      const { error: submitError, data: submissionData } = await safeAsync(
        () => submitApplication(form),
        "Failed to submit application"
      );

      if (submitError) {
        console.error("Submission error:", submitError);
        return;
      }

      console.log("Application submitted successfully:", submissionData);

      // Clear draft on successful submission
      localStorage.removeItem('visa-application-draft');
      
      // Navigate to payment with application ID if available
      if (submissionData && submissionData.id) {
        console.log("Navigating to payment with ID:", submissionData.id);
        navigate(`/application/payment?id=${submissionData.id}`);
      } else {
        console.log("No submission ID, navigating to review");
        navigate("/application/review");
      }
      
    } catch (error) {
      console.error("Unexpected error during submission:", error);
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <MobileDocumentsPageComponent 
      form={form} 
      onChange={handleFormChange}
      onSubmit={handleSubmit}
      submitting={submitting}
    />
  );
}
