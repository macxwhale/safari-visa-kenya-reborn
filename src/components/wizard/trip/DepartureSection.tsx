
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plane, Bus, Ship } from "lucide-react";
import { ModeButton } from "./ModeButton";
import { DatePicker } from "./DatePicker";
import { getKenyaData } from "./countryData";

type Mode = 'air' | 'sea' | 'land';

interface DepartureSectionProps {
  form: {
    exitDate: string;
    departureMode: Mode;
    departurePort: string;
    departureAirline: string;
    departureFlightNumber: string;
    finalDestinationCountry: string;
  };
  onChange: (field: string, value: any) => void;
  country: string; // Kenya - where they're departing FROM
  handleDateChange: (field: string) => (date: Date | undefined) => void;
}

export const DepartureSection: React.FC<DepartureSectionProps> = ({ 
  form, 
  onChange, 
  country, 
  handleDateChange 
}) => {
  const kenyaData = getKenyaData();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Departure Details from {country}</h3>
      <p className="text-sm text-gray-600">Select your departure details from {country}</p>
      <DatePicker
        date={form.exitDate}
        onSelect={handleDateChange('exitDate')}
        placeholder={`Your expected departure date from ${country}`}
      />
      <div className="flex space-x-2">
        <ModeButton label="Departing by Air" value="air" currentValue={form.departureMode} onClick={(v) => onChange('departureMode', v)}>
          <Plane />
        </ModeButton>
        <ModeButton label="Departing by Sea" value="sea" currentValue={form.departureMode} onClick={(v) => onChange('departureMode', v)}>
          <Ship />
        </ModeButton>
        <ModeButton label="Departing by Land" value="land" currentValue={form.departureMode} onClick={(v) => onChange('departureMode', v)}>
          <Bus />
        </ModeButton>
      </div>
      {form.departureMode === 'air' && (
        <div className="space-y-4 p-4 border rounded-md">
          <Select onValueChange={(value) => onChange('departurePort', value)} value={form.departurePort}>
            <SelectTrigger><SelectValue placeholder={`Select departure airport in ${country}`} /></SelectTrigger>
            <SelectContent className="z-[99999] bg-white border shadow-lg max-h-48 overflow-y-auto">
              {kenyaData.airports.map((airport: any) => (
                <SelectItem key={airport.code} value={airport.code}>
                  {airport.code} - {airport.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <Input placeholder="Airline" value={form.departureAirline} onChange={(e) => onChange('departureAirline', e.target.value)} />
            </div>
            <Input placeholder="Flight No." value={form.departureFlightNumber} onChange={(e) => onChange('departureFlightNumber', e.target.value)} />
          </div>
          <p className="text-sm text-gray-500">If you know your flight information, please input here otherwise leave blank.</p>
        </div>
      )}
      {form.departureMode === 'sea' && (
        <div className="space-y-4 p-4 border rounded-md">
          <Select onValueChange={(value) => onChange('departurePort', value)} value={form.departurePort}>
            <SelectTrigger><SelectValue placeholder={`Select departure port in ${country}`} /></SelectTrigger>
            <SelectContent className="z-[99999] bg-white border shadow-lg max-h-48 overflow-y-auto">
              {kenyaData.seaPorts.map((port: any) => (
                <SelectItem key={port.code} value={port.code}>
                  {port.code} - {port.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      {form.departureMode === 'land' && (
        <div className="space-y-4 p-4 border rounded-md">
          <Select onValueChange={(value) => onChange('departurePort', value)} value={form.departurePort}>
            <SelectTrigger><SelectValue placeholder={`Select border crossing from ${country}`} /></SelectTrigger>
            <SelectContent className="z-[99999] bg-white border shadow-lg max-h-48 overflow-y-auto">
              {kenyaData.landBorders.map((border: any) => (
                <SelectItem key={border.code} value={border.code}>
                  {border.code} - {border.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      <Select onValueChange={(value) => onChange('finalDestinationCountry', value)} value={form.finalDestinationCountry}>
        <SelectTrigger><SelectValue placeholder="Select the country where you will travel to as your final destination" /></SelectTrigger>
        <SelectContent className="z-[99999] bg-white border shadow-lg max-h-48 overflow-y-auto">
          <SelectItem value="USA">United States</SelectItem>
          <SelectItem value="GBR">United Kingdom</SelectItem>
          <SelectItem value="DNK">Denmark</SelectItem>
          <SelectItem value="DEU">Germany</SelectItem>
          <SelectItem value="CAN">Canada</SelectItem>
          <SelectItem value="AUS">Australia</SelectItem>
          <SelectItem value="FRA">France</SelectItem>
          <SelectItem value="ITA">Italy</SelectItem>
          <SelectItem value="ESP">Spain</SelectItem>
          <SelectItem value="NLD">Netherlands</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
