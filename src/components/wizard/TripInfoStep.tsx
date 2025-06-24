
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Plane, Bus, Ship, Calendar as CalendarIcon, Search } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

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
}

const ModeButton: React.FC<{
  label: string;
  value: Mode;
  currentValue: Mode;
  onClick: (value: Mode) => void;
  children: React.ReactNode;
}> = ({ label, value, currentValue, onClick, children }) => (
  <Button
    variant={currentValue === value ? "default" : "outline"}
    onClick={() => onClick(value)}
    className={`flex-1 flex-col h-20 ${currentValue === value ? 'bg-green-600 hover:bg-green-700' : ''}`}
  >
    {children}
    <span>{label}</span>
  </Button>
);

const DatePicker: React.FC<{ date: string; onSelect: (date: Date | undefined) => void; placeholder: string }> = ({ date, onSelect, placeholder }) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant={"outline"}
        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {date ? format(new Date(date), "PPP") : <span>{placeholder}</span>}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0 z-[9999]">
      <Calendar mode="single" selected={date ? new Date(date) : undefined} onSelect={onSelect} initialFocus />
    </PopoverContent>
  </Popover>
);

// Country-specific data
const getCountrySpecificData = (country: string) => {
  const countryData: Record<string, any> = {
    'Kenya': {
      airports: [
        { code: 'NBO', name: 'Jomo Kenyatta International Airport' },
        { code: 'MBA', name: 'Moi International Airport' },
        { code: 'WIL', name: 'Wilson Airport' },
        { code: 'KIS', name: 'Kisumu International Airport' },
      ],
      seaPorts: [
        { code: 'MBA', name: 'Port of Mombasa' },
        { code: 'LAM', name: 'Port of Lamu' },
      ],
      landBorders: [
        { code: 'NAM', name: 'Namanga Border (Tanzania)' },
        { code: 'MAL', name: 'Malaba Border (Uganda)' },
        { code: 'BUS', name: 'Busia Border (Uganda)' },
        { code: 'MOY', name: 'Moyale Border (Ethiopia)' },
      ]
    }
  };
  
  return countryData[country] || {
    airports: [
      { code: 'NBO', name: 'Jomo Kenyatta International Airport' },
      { code: 'MBA', name: 'Moi International Airport' },
      { code: 'WIL', name: 'Wilson Airport' },
    ],
    seaPorts: [
      { code: 'MBA', name: 'Port of Mombasa' },
    ],
    landBorders: [
      { code: 'NAM', name: 'Namanga Border' },
      { code: 'MAL', name: 'Malaba Border' },
    ]
  };
};

export default function TripInfoStep({ form, onChange, country = 'Kenya' }: TripInfoStepProps) {
  const handleDateChange = (field: string) => (date: Date | undefined) => {
    onChange(field, date ? format(date, "yyyy-MM-dd") : "");
  };

  const countryData = getCountrySpecificData(country);

  return (
    <ScrollArea className="h-full max-h-[80vh] w-full">
      <div className="space-y-8 animate-fade-in max-w-3xl p-1">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Provide details about your trip</h2>
          <Select onValueChange={(value) => onChange('purposeOfVisit', value)} value={form.purposeOfVisit}>
            <SelectTrigger>
              <SelectValue placeholder="Select purpose of visit" />
            </SelectTrigger>
            <SelectContent className="z-[9999] bg-white border shadow-lg">
              <SelectItem value="Tourism">Tourism</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
              <SelectItem value="Transit">Transit</SelectItem>
              <SelectItem value="Visiting Family/Friends">Visiting Family/Friends</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Arrival Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Arrival Details</h3>
          <DatePicker
            date={form.entryDate}
            onSelect={handleDateChange('entryDate')}
            placeholder={`Your expected arrival date in ${country}`}
          />
          <div className="flex space-x-2">
            <ModeButton label="Arriving by Air" value="air" currentValue={form.arrivalMode} onClick={(v) => onChange('arrivalMode', v)}>
              <Plane />
            </ModeButton>
            <ModeButton label="Arriving by Sea" value="sea" currentValue={form.arrivalMode} onClick={(v) => onChange('arrivalMode', v)}>
              <Ship />
            </ModeButton>
            <ModeButton label="Arriving by Land" value="land" currentValue={form.arrivalMode} onClick={(v) => onChange('arrivalMode', v)}>
              <Bus />
            </ModeButton>
          </div>
          {form.arrivalMode === 'air' && (
            <div className="space-y-4 p-4 border rounded-md">
              <Select onValueChange={(value) => onChange('arrivalPort', value)} value={form.arrivalPort}>
                <SelectTrigger><SelectValue placeholder="Select arrival airport" /></SelectTrigger>
                <SelectContent className="z-[9999] bg-white border shadow-lg">
                  {countryData.airports.map((airport: any) => (
                    <SelectItem key={airport.code} value={airport.code}>
                      {airport.code} - {airport.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <Input placeholder="Airline" value={form.arrivalAirline} onChange={(e) => onChange('arrivalAirline', e.target.value)} />
                </div>
                <Input placeholder="Flight No." value={form.flightNumber} onChange={(e) => onChange('flightNumber', e.target.value)} />
              </div>
              <p className="text-sm text-gray-500">Provide information on your flight to {country}.</p>
            </div>
          )}
          {form.arrivalMode === 'sea' && (
            <div className="space-y-4 p-4 border rounded-md">
              <Select onValueChange={(value) => onChange('arrivalPort', value)} value={form.arrivalPort}>
                <SelectTrigger><SelectValue placeholder="Select arrival port" /></SelectTrigger>
                <SelectContent className="z-[9999] bg-white border shadow-lg">
                  {countryData.seaPorts.map((port: any) => (
                    <SelectItem key={port.code} value={port.code}>
                      {port.code} - {port.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          {form.arrivalMode === 'land' && (
            <div className="space-y-4 p-4 border rounded-md">
              <Select onValueChange={(value) => onChange('arrivalPort', value)} value={form.arrivalPort}>
                <SelectTrigger><SelectValue placeholder="Select border crossing" /></SelectTrigger>
                <SelectContent className="z-[9999] bg-white border shadow-lg">
                  {countryData.landBorders.map((border: any) => (
                    <SelectItem key={border.code} value={border.code}>
                      {border.code} - {border.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Departure Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Departure Details</h3>
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
                <SelectTrigger><SelectValue placeholder="Select departure airport" /></SelectTrigger>
                <SelectContent className="z-[9999] bg-white border shadow-lg">
                  {countryData.airports.map((airport: any) => (
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
                <SelectTrigger><SelectValue placeholder="Select departure port" /></SelectTrigger>
                <SelectContent className="z-[9999] bg-white border shadow-lg">
                  {countryData.seaPorts.map((port: any) => (
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
                <SelectTrigger><SelectValue placeholder="Select border crossing" /></SelectTrigger>
                <SelectContent className="z-[9999] bg-white border shadow-lg">
                  {countryData.landBorders.map((border: any) => (
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
            <SelectContent className="z-[9999] bg-white border shadow-lg">
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

        {/* Accommodation Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Address(es) in {country}</h3>
          <p className="text-sm text-gray-600">Name of hotel/guesthouse or address of residence.</p>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input 
              placeholder={`Hotel Boulevard Nairobi, City Centre CBD, Harry Thuku Road, Nairobi, ${country}`}
              value={form.accommodationAddress}
              onChange={(e) => onChange('accommodationAddress', e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <DatePicker
              date={form.accommodationCheckInDate}
              onSelect={handleDateChange('accommodationCheckInDate')}
              placeholder="Check-in date"
            />
            <DatePicker
              date={form.accommodationCheckOutDate}
              onSelect={handleDateChange('accommodationCheckOutDate')}
              placeholder="Check-out date"
            />
          </div>
          <Button variant="link" className="p-0 h-auto text-green-600">+ Add Address</Button>
        </div>
      </div>
    </ScrollArea>
  );
}
