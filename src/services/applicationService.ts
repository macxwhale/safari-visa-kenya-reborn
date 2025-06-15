
import { supabase } from "@/integrations/supabase/client";
import { ApplicationFormState } from "@/hooks/useApplicationForm";

export const submitApplication = async (form: ApplicationFormState) => {
  let passport_doc_url: string | undefined;

  // Passport upload (critical)
  if (form.passportDoc) {
    const { data, error: uploadError } = await supabase.storage
      .from("eta-documents")
      .upload(`public/${Date.now()}_passport_${form.passportDoc.name}`, form.passportDoc);
    if (uploadError) {
      throw new Error("Failed to upload passport document: " + uploadError.message);
    }
    passport_doc_url = data?.path;
  }

  // Selfie upload (critical)
  if (form.selfieDoc) {
    const { error: uploadError } = await supabase.storage
      .from("eta-documents")
      .upload(`public/${Date.now()}_selfie_${form.selfieDoc.name}`, form.selfieDoc);
    if (uploadError) {
      throw new Error("Failed to upload selfie document: " + uploadError.message);
    }
  }

  // Optional documents upload (non-critical, fire-and-forget)
  const uploadOptionalFile = async (file: File, type: string) => {
    const { error } = await supabase.storage
      .from("eta-documents")
      .upload(`public/${Date.now()}_${type}_${file.name}`, file);
    if (error) {
      console.error(`Failed to upload optional document (${type}): ${error.message}`);
    }
  };

  const uploadPromises = [
    ...form.accommodationDocs.map(file => uploadOptionalFile(file, 'accommodation')),
    ...form.airlineDocs.map(file => uploadOptionalFile(file, 'airline')),
  ];

  Promise.all(uploadPromises);

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
    throw new Error("Submission failed: " + insertError.message);
  }
};
