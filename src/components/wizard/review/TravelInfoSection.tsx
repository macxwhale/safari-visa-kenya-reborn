
import { ApplicationFormState } from "@/hooks/useApplicationForm";
import { formatMode } from "./reviewUtils";

interface TravelInfoSectionProps {
  form: ApplicationFormState;
}

export default function TravelInfoSection({ form }: TravelInfoSectionProps) {
  return (
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
  );
}
