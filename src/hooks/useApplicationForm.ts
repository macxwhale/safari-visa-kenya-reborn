
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
  additionalDocs: [] as File[],
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

  return { form, handleFormChange };
};
