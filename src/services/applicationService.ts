
import { supabase } from "@/integrations/supabase/client";
import { ApplicationFormState } from "@/hooks/useApplicationForm";
import { safeAsync, withTimeout } from "@/utils/asyncHelpers";
import { uploadCriticalFile, uploadOptionalFile } from "./fileUploadService";
import { sanitizeFormData } from "./dataValidationService";

const SUBMIT_TIMEOUT = 15000;

export const submitApplication = async (form: ApplicationFormState): Promise<void> => {
  const cleanForm = sanitizeFormData(form);
  
  let passport_doc_url: string | undefined;
  let selfie_doc_url: string | undefined;

  // Upload critical documents
  if (cleanForm.passportDoc) {
    passport_doc_url = await uploadCriticalFile(cleanForm.passportDoc, 'passport');
  }

  if (cleanForm.selfieDoc) {
    selfie_doc_url = await uploadCriticalFile(cleanForm.selfieDoc, 'selfie');
  }

  // Fire-and-forget optional uploads
  const uploadPromises = [
    ...cleanForm.accommodationDocs.map(file => uploadOptionalFile(file, 'accommodation')),
    ...cleanForm.airlineDocs.map(file => uploadOptionalFile(file, 'airline')),
  ];

  Promise.allSettled(uploadPromises).catch(error => {
    console.error('Some optional uploads failed:', error);
  });

  // Submit application data
  const { error } = await safeAsync(async () => {
    const insertOperation = supabase
      .from("eta_applications")
      .insert({
        user_id: null,
        full_name: cleanForm.fullName,
        email: cleanForm.email,
        phone: cleanForm.phone,
        home_address: cleanForm.homeAddress,
        occupation: cleanForm.occupation,
        passport: cleanForm.passport,
        nationality: cleanForm.nationality,
        date_of_birth: cleanForm.dateOfBirth,
        place_of_birth: cleanForm.placeOfBirth,
        passport_issue_date: cleanForm.passportIssueDate,
        passport_expiry_date: cleanForm.passportExpiryDate,
        travel_from: cleanForm.travelFrom,
        entry_date: cleanForm.entryDate,
        exit_date: cleanForm.exitDate,
        purpose_of_visit: cleanForm.purposeOfVisit,
        accommodation_address: cleanForm.accommodationAddress,
        doc_url: passport_doc_url,
        selfie_url: selfie_doc_url,
        arrival_mode: cleanForm.arrivalMode,
        departure_mode: cleanForm.departureMode,
        arrival_port: cleanForm.arrivalPort,
        departure_port: cleanForm.departurePort,
        arrival_airline: cleanForm.arrivalAirline,
        departure_airline: cleanForm.departureAirline,
        flight_number: cleanForm.flightNumber,
        departure_flight_number: cleanForm.departureFlightNumber,
        final_destination_country: cleanForm.finalDestinationCountry,
        accommodation_check_in_date: cleanForm.accommodationCheckInDate,
        accommodation_check_out_date: cleanForm.accommodationCheckOutDate,
        trip_financed_by_third_party: cleanForm.tripFinancedByThirdParty,
        country_of_birth: cleanForm.countryOfBirth,
        nationality_at_birth: cleanForm.nationalityAtBirth,
        convicted_in_past_5_years: cleanForm.convictedInPast5Years,
        denied_entry_to_kenya: cleanForm.deniedEntryToKenya,
        marital_status: cleanForm.maritalStatus,
        previously_travelled_to_kenya: cleanForm.previouslyTravelledToKenya,
        customs_declaration: cleanForm.customsDeclaration,
        bringing_currency_over_5000: cleanForm.bringingCurrencyOver5000,
      })
      .select();

    return withTimeout(
      Promise.resolve(insertOperation),
      SUBMIT_TIMEOUT,
      "Application submission timed out"
    );
  }, "Application submission failed");

  if (error) {
    throw new Error(error);
  }
};

export const autoSaveFormData = async (form: ApplicationFormState, stepName: string): Promise<void> => {
  try {
    const key = `eta_form_${stepName}`;
    const sanitizedData = sanitizeFormData(form);
    localStorage.setItem(key, JSON.stringify(sanitizedData));
  } catch (error) {
    console.warn(`Failed to auto-save ${stepName} data:`, error);
  }
};

export const loadSavedFormData = (stepName: string): Partial<ApplicationFormState> | null => {
  try {
    const key = `eta_form_${stepName}`;
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.warn(`Failed to load saved ${stepName} data:`, error);
    return null;
  }
};
