
import { supabase } from "@/integrations/supabase/client";
import { ApplicationFormState } from "@/hooks/useApplicationForm";
import { safeAsync, withTimeout } from "@/utils/asyncHelpers";
import { uploadCriticalFile, uploadOptionalFile } from "./fileUploadService";

const SUBMIT_TIMEOUT = 15000; // 15 seconds

export const submitApplication = async (form: ApplicationFormState): Promise<void> => {
  let passport_doc_url: string | undefined;
  let selfie_doc_url: string | undefined;

  // Upload critical documents
  if (form.passportDoc) {
    passport_doc_url = await uploadCriticalFile(form.passportDoc, 'passport');
  }

  if (form.selfieDoc) {
    selfie_doc_url = await uploadCriticalFile(form.selfieDoc, 'selfie');
  }

  // Fire-and-forget optional uploads
  const uploadPromises = [
    ...form.accommodationDocs.map(file => uploadOptionalFile(file, 'accommodation')),
    ...form.airlineDocs.map(file => uploadOptionalFile(file, 'airline')),
  ];

  // Don't wait for optional uploads to complete
  Promise.allSettled(uploadPromises).catch(error => {
    console.error('Some optional uploads failed:', error);
  });

  // Submit application data
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
            date_of_birth: form.dateOfBirth,
            place_of_birth: form.placeOfBirth,
            passport_issue_date: form.passportIssueDate,
            passport_expiry_date: form.passportExpiryDate,
            travel_from: form.travelFrom,
            entry_date: form.entryDate,
            exit_date: form.exitDate,
            purpose_of_visit: form.purposeOfVisit,
            accommodation_address: form.accommodationAddress,
            doc_url: passport_doc_url,
            selfie_url: selfie_doc_url,
            // Additional trip data
            arrival_mode: form.arrivalMode,
            departure_mode: form.departureMode,
            arrival_port: form.arrivalPort,
            departure_port: form.departurePort,
            arrival_airline: form.arrivalAirline,
            departure_airline: form.departureAirline,
            flight_number: form.flightNumber,
            departure_flight_number: form.departureFlightNumber,
            final_destination_country: form.finalDestinationCountry,
            accommodation_check_in_date: form.accommodationCheckInDate,
            accommodation_check_out_date: form.accommodationCheckOutDate,
            // Traveller information
            trip_financed_by_third_party: form.tripFinancedByThirdParty,
            country_of_birth: form.countryOfBirth,
            nationality_at_birth: form.nationalityAtBirth,
            convicted_in_past_5_years: form.convictedInPast5Years,
            denied_entry_to_kenya: form.deniedEntryToKenya,
            marital_status: form.maritalStatus,
            previously_travelled_to_kenya: form.previouslyTravelledToKenya,
            // Customs declaration
            customs_declaration: form.customsDeclaration,
            bringing_currency_over_5000: form.bringingCurrencyOver5000,
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
