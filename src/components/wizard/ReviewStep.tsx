
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
  };
}

export default function ReviewStep({ travelerType, applicationType, country, form }: ReviewStepProps) {
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
              <span className="ml-2 font-medium">{form.purposeOfVisit}</span>
            </div>
            <div>
              <span className="text-gray-600">Traveling From:</span>
              <span className="ml-2 font-medium">{form.travelFrom}</span>
            </div>
            <div>
              <span className="text-gray-600">Entry Date:</span>
              <span className="ml-2 font-medium">{form.entryDate}</span>
            </div>
            <div>
              <span className="text-gray-600">Exit Date:</span>
              <span className="ml-2 font-medium">{form.exitDate}</span>
            </div>
            <div>
              <span className="text-gray-600">Flight Number:</span>
              <span className="ml-2 font-medium">{form.flightNumber}</span>
            </div>
          </div>
          <div className="mt-3">
            <span className="text-gray-600">Accommodation Address:</span>
            <p className="mt-1 font-medium">{form.accommodationAddress}</p>
          </div>
          {form.contactInKenya && (
            <div className="mt-3">
              <span className="text-gray-600">Contact in Kenya:</span>
              <p className="mt-1 font-medium">{form.contactInKenya}</p>
            </div>
          )}
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
