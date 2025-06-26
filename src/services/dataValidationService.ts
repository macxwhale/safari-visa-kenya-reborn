
import { ApplicationFormState } from "@/hooks/useApplicationForm";

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validatePassportData = (form: ApplicationFormState): ValidationResult => {
  const errors: string[] = [];

  if (!form.fullName?.trim()) errors.push("Full name is required");
  if (!form.passport?.trim()) errors.push("Passport number is required");
  if (!form.nationality?.trim()) errors.push("Nationality is required");
  if (!form.dateOfBirth) errors.push("Date of birth is required");
  if (!form.placeOfBirth?.trim()) errors.push("Place of birth is required");
  if (!form.passportIssueDate) errors.push("Passport issue date is required");
  if (!form.passportExpiryDate) errors.push("Passport expiry date is required");

  // Validate passport expiry date is in the future
  if (form.passportExpiryDate) {
    const expiryDate = new Date(form.passportExpiryDate);
    const today = new Date();
    if (expiryDate <= today) {
      errors.push("Passport must be valid for at least 6 months");
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateTripData = (form: ApplicationFormState): ValidationResult => {
  const errors: string[] = [];

  if (!form.purposeOfVisit) errors.push("Purpose of visit is required");
  if (!form.entryDate) errors.push("Entry date is required");
  if (!form.exitDate) errors.push("Exit date is required");
  if (!form.arrivalMode) errors.push("Arrival mode is required");
  if (!form.departureMode) errors.push("Departure mode is required");
  if (!form.accommodationAddress?.trim()) errors.push("Accommodation address is required");

  // Validate dates
  if (form.entryDate && form.exitDate) {
    const entryDate = new Date(form.entryDate);
    const exitDate = new Date(form.exitDate);
    if (exitDate <= entryDate) {
      errors.push("Exit date must be after entry date");
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateTravellerData = (form: ApplicationFormState): ValidationResult => {
  const errors: string[] = [];

  if (form.tripFinancedByThirdParty === null) errors.push("Trip financing question must be answered");
  if (!form.countryOfBirth) errors.push("Country of birth is required");
  if (!form.nationalityAtBirth) errors.push("Nationality at birth is required");
  if (form.convictedInPast5Years === null) errors.push("Conviction question must be answered");
  if (form.deniedEntryToKenya === null) errors.push("Entry denial question must be answered");
  if (!form.maritalStatus) errors.push("Marital status is required");
  if (form.previouslyTravelledToKenya === null) errors.push("Previous travel question must be answered");

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const sanitizeFormData = (form: ApplicationFormState): ApplicationFormState => {
  return {
    ...form,
    fullName: form.fullName?.trim() || "",
    email: form.email?.trim().toLowerCase() || "",
    phone: form.phone?.trim() || "",
    passport: form.passport?.trim().toUpperCase() || "",
    nationality: form.nationality?.trim() || "",
    placeOfBirth: form.placeOfBirth?.trim() || "",
    accommodationAddress: form.accommodationAddress?.trim() || "",
    homeAddress: form.homeAddress?.trim() || "",
    occupation: form.occupation?.trim() || "",
    contactInKenya: form.contactInKenya?.trim() || "",
    travelFrom: form.travelFrom?.trim() || "",
    arrivalAirline: form.arrivalAirline?.trim() || "",
    departureAirline: form.departureAirline?.trim() || "",
    flightNumber: form.flightNumber?.trim() || "",
    departureFlightNumber: form.departureFlightNumber?.trim() || "",
  };
};
