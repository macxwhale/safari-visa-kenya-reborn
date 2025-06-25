
import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ArrivalSection } from "./trip/ArrivalSection";
import { DepartureSection } from "./trip/DepartureSection";
import { AccommodationSection } from "./trip/AccommodationSection";

type Mode = 'air' | 'sea' | 'land';

interface TripInfoStepProps {
  form: {
    purposeOfVisit: string;
    entryDate: string;
    exitDate: string;
    arrivalMode: Mode;
    departureMode: Mode;
    arrivalPort: string;
    departurePort: string;
    arrivalAirline: string;
    departureAirline: string;
    flightNumber: string; // arrival flight number
    departureFlightNumber: string;
    finalDestinationCountry: string;
    accommodationAddress: string;
    accommodationCheckInDate: string;
    accommodationCheckOutDate: string;
  };
  onChange: (field: string, value: any) => void;
  country?: string;
  onNext?: () => void;
}

export default function TripInfoStep({ form, onChange, country = 'Kenya', onNext }: TripInfoStepProps) {
  const handleDateChange = (field: string) => (date: Date | undefined) => {
    onChange(field, date ? format(date, "yyyy-MM-dd") : "");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 max-h-[60vh] overflow-y-auto px-1">
        <div className="space-y-8 animate-fade-in max-w-3xl">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Provide details about your trip to {country}
            </h2>
            <Select onValueChange={(value) => onChange('purposeOfVisit', value)} value={form.purposeOfVisit}>
              <SelectTrigger>
                <SelectValue placeholder="Select purpose of visit" />
              </SelectTrigger>
              <SelectContent className="z-[99999] bg-white border shadow-lg">
                <SelectItem value="Tourism">Tourism</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Transit">Transit</SelectItem>
                <SelectItem value="Visiting Family/Friends">Visiting Family/Friends</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <ArrivalSection 
            form={form}
            onChange={onChange}
            country={country}
            handleDateChange={handleDateChange}
          />

          <DepartureSection 
            form={form}
            onChange={onChange}
            country={country}
            handleDateChange={handleDateChange}
          />

          <AccommodationSection 
            form={form}
            onChange={onChange}
            country={country}
            handleDateChange={handleDateChange}
          />
        </div>
      </div>

      {/* Next Button */}
      {onNext && (
        <div className="flex-shrink-0 border-t border-gray-200 p-6 bg-white">
          <div className="flex justify-end">
            <Button 
              onClick={onNext}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 font-semibold"
            >
              Next: Traveller Information
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
