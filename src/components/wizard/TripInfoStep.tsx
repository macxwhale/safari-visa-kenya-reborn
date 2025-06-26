
import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrivalSection } from "./trip/ArrivalSection";
import { DepartureSection } from "./trip/DepartureSection";
import { AccommodationSection } from "./trip/AccommodationSection";
import { format } from "date-fns";

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
    flightNumber: string;
    departureFlightNumber: string;
    finalDestinationCountry: string;
    accommodationAddress: string;
    accommodationCheckInDate: string;
    accommodationCheckOutDate: string;
    travelFrom: string;
  };
  onChange: (field: string, value: any) => void;
  country?: string;
}

export default function TripInfoStep({ form, onChange, country = 'Kenya' }: TripInfoStepProps) {
  const handleDateChange = (field: string) => (date: Date | undefined) => {
    onChange(field, date ? format(date, "yyyy-MM-dd") : "");
  };

  const originCountry = form.travelFrom || 'United States';

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Trip Details to Kenya
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Traveling from {originCountry} to Kenya
        </p>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Purpose of Visit *
          </label>
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
      </div>

      <ArrivalSection 
        form={form}
        onChange={onChange}
        originCountry={originCountry}
        destinationCountry="Kenya"
        handleDateChange={handleDateChange}
      />

      <DepartureSection 
        form={form}
        onChange={onChange}
        country="Kenya"
        handleDateChange={handleDateChange}
      />

      <AccommodationSection 
        form={form}
        onChange={onChange}
        country="Kenya"
        handleDateChange={handleDateChange}
      />
    </div>
  );
}
