
import { ApplicationFormState } from "@/hooks/useApplicationForm";
import { formatBoolean } from "./reviewUtils";

interface TravellerInfoSectionProps {
  form: ApplicationFormState;
}

export default function TravellerInfoSection({ form }: TravellerInfoSectionProps) {
  return (
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
  );
}
