
interface ApplicationDetailsSectionProps {
  travelerType: string;
  applicationType?: string;
  country?: string;
}

export default function ApplicationDetailsSection({ travelerType, applicationType, country }: ApplicationDetailsSectionProps) {
  return (
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
  );
}
