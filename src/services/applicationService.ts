
import { supabase } from "@/integrations/supabase/client";
import { ApplicationFormState } from "@/hooks/useApplicationForm";
import { safeAsync, withTimeout } from "@/utils/asyncHelpers";

const UPLOAD_TIMEOUT = 30000; // 30 seconds
const SUBMIT_TIMEOUT = 15000; // 15 seconds

export const submitApplication = async (form: ApplicationFormState): Promise<void> => {
  let passport_doc_url: string | undefined;
  let selfie_doc_url: string | undefined;

  // Passport upload (critical)
  if (form.passportDoc) {
    const fileName = `${Date.now()}_passport_${form.passportDoc.name}`;
    const { data, error } = await safeAsync(async () => {
      return withTimeout(
        supabase.storage
          .from("eta-documents")
          .upload(`public/${fileName}`, form.passportDoc!),
        UPLOAD_TIMEOUT,
        "Passport upload timed out"
      );
    }, "Failed to upload passport document");

    if (error || !data.data) {
      throw new Error(error || "Failed to upload passport document");
    }
    passport_doc_url = data.data.path;
  }

  // Selfie upload (critical)
  if (form.selfieDoc) {
    const fileName = `${Date.now()}_selfie_${form.selfieDoc.name}`;
    const { data, error } = await safeAsync(async () => {
      return withTimeout(
        supabase.storage
          .from("eta-documents")
          .upload(`public/${fileName}`, form.selfieDoc!),
        UPLOAD_TIMEOUT,
        "Selfie upload timed out"
      );
    }, "Failed to upload selfie document");

    if (error || !data.data) {
      throw new Error(error || "Failed to upload selfie document");
    }
    selfie_doc_url = data.data.path;
  }

  // Optional documents upload (non-critical, fire-and-forget with error logging)
  const uploadOptionalFile = async (file: File, type: string) => {
    const fileName = `${Date.now()}_${type}_${file.name}`;
    const { error } = await safeAsync(async () => {
      return supabase.storage
        .from("eta-documents")
        .upload(`public/${fileName}`, file);
    });

    if (error) {
      console.error(`Failed to upload optional document (${type}):`, error);
    }
  };

  // Fire-and-forget optional uploads
  const uploadPromises = [
    ...form.accommodationDocs.map(file => uploadOptionalFile(file, 'accommodation')),
    ...form.airlineDocs.map(file => uploadOptionalFile(file, 'airline')),
  ];

  // Don't wait for optional uploads to complete
  Promise.allSettled(uploadPromises).catch(error => {
    console.error('Some optional uploads failed:', error);
  });

  // Submit application data with all passport and contact details
  const { error } = await safeAsync(async () => {
    return withTimeout(
      Promise.resolve(
        supabase
          .from("eta_applications")
          .insert({
            user_id: null,
            full_name: form.fullName,
            email: form.email,
            phone: form.phone,
            home_address: form.homeAddress,
            occupation: form.occupation,
            passport: form.passport,
            nationality: form.nationality,
            travel_from: form.travelFrom,
            entry_date: form.entryDate,
            doc_url: passport_doc_url,
          })
      ),
      SUBMIT_TIMEOUT,
      "Application submission timed out"
    );
  }, "Application submission failed");

  if (error) {
    throw new Error(error);
  }
};
