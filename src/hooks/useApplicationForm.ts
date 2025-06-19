
import { useState } from 'react';

export const initialFormState = {
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
  travelFrom: "",
  entryDate: "",
  exitDate: "",
  flightNumber: "",
  customsDeclaration: false,
  bringingCurrencyOver5000: null as boolean | null,
  accommodationDocs: [] as File[],
  airlineDocs: [] as File[],
  arrivalMode: 'air' as 'air' | 'sea' | 'land',
  departureMode: 'air' as 'air' | 'sea' | 'land',
  arrivalPort: "",
  departurePort: "",
  arrivalAirline: "",
  departureAirline: "",
  departureFlightNumber: "",
  finalDestinationCountry: "",
  accommodationCheckInDate: "",
  accommodationCheckOutDate: "",
  tripFinancedByThirdParty: null as boolean | null,
  countryOfBirth: "",
  nationalityAtBirth: "",
  convictedInPast5Years: null as boolean | null,
  deniedEntryToKenya: null as boolean | null,
  maritalStatus: "",
  previouslyTravelledToKenya: null as boolean | null,
  // OCR extracted data
  ocrFullName: "",
  ocrDocumentNumber: "",
  ocrDateOfBirth: "",
  ocrValidityDate: "",
  ocrExtractedAt: null as Date | null,
};

export type ApplicationFormState = typeof initialFormState;

export const useApplicationForm = (initialTravelFrom: string = "") => {
  const [form, setForm] = useState<ApplicationFormState>({
    ...initialFormState,
    travelFrom: initialTravelFrom,
  });

  const handleFormChange = (field: keyof ApplicationFormState, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const setOCRData = (ocrData: {
    fullName: string;
    documentNumber: string;
    dateOfBirth: string;
    validityDate: string;
  }) => {
    setForm(prev => ({
      ...prev,
      ocrFullName: ocrData.fullName,
      ocrDocumentNumber: ocrData.documentNumber,
      ocrDateOfBirth: ocrData.dateOfBirth,
      ocrValidityDate: ocrData.validityDate,
      ocrExtractedAt: new Date(),
    }));
  };

  return { form, handleFormChange, setOCRData };
};
