
interface ReviewStepProps {
  travelerType: string;
  applicationType?: string;
  country?: string;
  form: {
    fullName: string;
    email: string;
    phone: string;
    passport: string;
    nationality: string;
    dateOfBirth: string;
    placeOfBirth: string;
    passportIssueDate: string;
    passportExpiryDate: string;
    purposeOfVisit: string;
    accommodationAddress: string;
    homeAddress: string;
    occupation: string;
    contactInKenya: string;
    travelFrom: string;
    entryDate: string;
    exitDate: string;
    flightNumber: string;
    customsDeclaration: boolean;
    passportDoc: File | null;
    selfieDoc: File | null;
    additionalDocs: File[];
    arrivalMode: 'air' | 'sea' | 'land';
    departureMode: 'air' | 'sea' | 'land';
    arrivalPort: string;
    departurePort: string;
    arrivalAirline: string;
    departureAirline: string;
    departureFlightNumber: string;
    finalDestinationCountry: string;
    accommodationCheckInDate: string;
    accommodationCheckOutDate: string;
    tripFinancedByThirdParty: boolean | null;
    countryOfBirth: string;
    nationalityAtBirth: string;
    convictedInPast5Years: boolean | null;
    deniedEntryToKenya: boolean | null;
    maritalStatus: string;
    previouslyTravelledToKenya: boolean | null;
  };
}

export default function ReviewStep({ travelerType, applicationType, country, form }: ReviewStepProps) {
  const formatMode = (mode: string) => {
    if (!mode) return 'N/A';
    return mode.charAt(0).toUpperCase() + mode.slice(1);
  }
  const formatBoolean = (value: boolean | null) => {
    if (value === null) return 'Not answered';
    return value ? 'Yes' : 'No';
  }
  return (
    <div className="animate-fade-in max-w-2xl">
      <h2 className="text-xl font-semibold mb-6 text-gray-900">Review Your Application</h2>
      
      <div className="space-y-6">
        {/* Application Type Section */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3">Application Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Traveler Type:</span>
              <span className="ml-2 font-medium">{travelerType}</span>
            </div>
            {applicationType && (
              <div>
                <span className="text-gray-600">Application Type:</span>
                <span className="ml-2 font-medium">{applicationType}</span>
              </div>
            )}
            {country && (
              <div>
                <span className="text-gray-600">Country of Residence:</span>
                <span className="ml-2 font-medium">{country}</span>
              </div>
            )}
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Full Name:</span>
              <span className="ml-2 font-medium">{form.fullName}</span>
            </div>
            <div>
              <span className="text-gray-600">Email:</span>
              <span className="ml-2 font-medium">{form.email}</span>
            </div>
            <div>
              <span className="text-gray-600">Phone:</span>
              <span className="ml-2 font-medium">{form.phone}</span>
            </div>
            <div>
              <span className="text-gray-600">Date of Birth:</span>
              <span className="ml-2 font-medium">{form.dateOfBirth}</span>
            </div>
            <div>
              <span className="text-gray-600">Place of Birth:</span>
              <span className="ml-2 font-medium">{form.placeOfBirth}</span>
            </div>
            <div>
              <span className="text-gray-600">Home Address:</span>
              <span className="ml-2 font-medium">{form.homeAddress}</span>
            </div>
            <div>
              <span className="text-gray-600">Occupation:</span>
              <span className="ml-2 font-medium">{form.occupation}</span>
            </div>
          </div>
        </div>

        {/* Passport Information Section */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3">Passport Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Passport Number:</span>
              <span className="ml-2 font-medium">{form.passport}</span>
            </div>
            <div>
              <span className="text-gray-600">Nationality:</span>
              <span className="ml-2 font-medium">{form.nationality}</span>
            </div>
            <div>
              <span className="text-gray-600">Issue Date:</span>
              <span className="ml-2 font-medium">{form.passportIssueDate}</span>
            </div>
            <div>
              <span className="text-gray-600">Expiry Date:</span>
              <span className="ml-2 font-medium">{form.passportExpiryDate}</span>
            </div>
          </div>
        </div>

        {/* Travel Information Section */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3">Travel Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Purpose of Visit:</span>
              <span className="ml-2 font-medium">{form.purposeOfVisit || 'N/A'}</span>
            </div>
            <div>
              <span className="text-gray-600">Final Destination:</span>
              <span className="ml-2 font-medium">{form.finalDestinationCountry || 'N/A'}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <h4 className="font-medium text-gray-800 mb-2">Arrival</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Arrival Date:</span>
                <span className="ml-2 font-medium">{form.entryDate || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-600">Arrival Mode:</span>
                <span className="ml-2 font-medium">{formatMode(form.arrivalMode)}</span>
              </div>
              {form.arrivalMode === 'air' && <>
                <div>
                  <span className="text-gray-600">Arrival Port:</span>
                  <span className="ml-2 font-medium">{form.arrivalPort || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-gray-600">Airline:</span>
                  <span className="ml-2 font-medium">{form.arrivalAirline || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-gray-600">Flight Number:</span>
                  <span className="ml-2 font-medium">{form.flightNumber || 'N/A'}</span>
                </div>
              </>}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <h4 className="font-medium text-gray-800 mb-2">Departure</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Departure Date:</span>
                <span className="ml-2 font-medium">{form.exitDate || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-600">Departure Mode:</span>
                <span className="ml-2 font-medium">{formatMode(form.departureMode)}</span>
              </div>
              {form.departureMode === 'air' && <>
                <div>
                  <span className="text-gray-600">Departure Port:</span>
                  <span className="ml-2 font-medium">{form.departurePort || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-gray-600">Airline:</span>
                  <span className="ml-2 font-medium">{form.departureAirline || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-gray-600">Flight Number:</span>
                  <span className="ml-2 font-medium">{form.departureFlightNumber || 'N/A'}</span>
                </div>
              </>}
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <h4 className="font-medium text-gray-800 mb-2">Accommodation</h4>
            <div className="text-sm">
                <span className="text-gray-600">Address:</span>
                <p className="mt-1 font-medium">{form.accommodationAddress || 'N/A'}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-2">
                <div>
                    <span className="text-gray-600">Check-in:</span>
                    <span className="ml-2 font-medium">{form.accommodationCheckInDate || 'N/A'}</span>
                </div>
                <div>
                    <span className="text-gray-600">Check-out:</span>
                    <span className="ml-2 font-medium">{form.accommodationCheckOutDate || 'N/A'}</span>
                </div>
            </div>
          </div>

        </div>

        {/* Traveller Information Section */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3">Traveller Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Marital Status:</span>
              <span className="ml-2 font-medium capitalize">{form.maritalStatus || 'N/A'}</span>
            </div>
            <div>
              <span className="text-gray-600">Country of Birth:</span>
              <span className="ml-2 font-medium">{form.countryOfBirth || 'N/A'}</span>
            </div>
            <div>
              <span className="text-gray-600">Nationality at Birth:</span>
              <span className="ml-2 font-medium">{form.nationalityAtBirth || 'N/A'}</span>
            </div>
          </div>
          <div className="space-y-3 text-sm mt-4 pt-4 border-t">
              <div>
                <p className="text-gray-600">Is your trip financed by a third party, which is not your employer nor a government?</p>
                <p className="font-medium">{formatBoolean(form.tripFinancedByThirdParty)}</p>
              </div>
              <div>
                <p className="text-gray-600">Have you ever been convicted of any offence, under any system of law, in the past 5 years?</p>
                <p className="font-medium">{formatBoolean(form.convictedInPast5Years)}</p>
              </div>
              <div>
                <p className="text-gray-600">Have you ever been previously denied entry to Kenya?</p>
                <p className="font-medium">{formatBoolean(form.deniedEntryToKenya)}</p>
              </div>
              <div>
                <p className="text-gray-600">Have you previously travelled to Kenya?</p>
                <p className="font-medium">{formatBoolean(form.previouslyTravelledToKenya)}</p>
              </div>
          </div>
        </div>

        {/* Documents Section */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3">Uploaded Documents</h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-600">Passport Document:</span>
              <span className="ml-2 font-medium">
                {form.passportDoc ? form.passportDoc.name : "Not uploaded"}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Photo/Selfie:</span>
              <span className="ml-2 font-medium">
                {form.selfieDoc ? form.selfieDoc.name : "Not uploaded"}
              </span>
            </div>
            {form.additionalDocs.length > 0 && (
              <div>
                <span className="text-gray-600">Additional Documents:</span>
                <ul className="ml-2 mt-1">
                  {form.additionalDocs.map((doc, index) => (
                    <li key={index} className="font-medium">• {doc.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Customs Declaration */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3">Customs Declaration</h3>
          <div className="text-sm">
            <span className="text-gray-600">Declaration Status:</span>
            <span className={`ml-2 font-medium ${form.customsDeclaration ? 'text-green-600' : 'text-red-600'}`}>
              {form.customsDeclaration ? "Confirmed" : "Not confirmed"}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          Please review all information carefully before proceeding to payment. 
          Once submitted, changes may not be possible.
        </p>
      </div>
    </div>
  );
}
