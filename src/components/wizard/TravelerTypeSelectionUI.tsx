
import { Button } from "@/components/ui/button";
import { X, Globe, HelpCircle } from "lucide-react";
import { FlagIcon } from "@/components/ui/flag-icon";
import { TravelerType } from "./types";

interface TravelerTypeSelectionUIProps {
  onTravelerTypeClick: (typeId: string) => void;
  onClose: () => void;
}

const eacCountries = [
  "Kenya", 
  "Tanzania", 
  "Uganda", 
  "Rwanda", 
  "Burundi", 
  "Democratic Republic of Congo", 
  "South Sudan"
];

const travelerTypes: TravelerType[] = [
  {
    id: "tourist",
    title: "Tourists & Visitors",
    description: "If you are visiting Kenya for tourism, business, or visiting for any other reason to apply for your travel authorisation.",
    color: "bg-brand-green",
    icon: <Globe className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
  },
  {
    id: "eac-passport",
    title: "Kenya & East African Partner State Passport Holders",
    description: "As of early 2025, citizens of Kenya & East African Partner States Passport Holders countries can enter Kenya without a visa",
    color: "bg-orange-500",
    countries: eacCountries
  }
];

export default function TravelerTypeSelectionUI({ onTravelerTypeClick, onClose }: TravelerTypeSelectionUIProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Modal overlay */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
      
      {/* Modal content */}
      <div className="relative z-50 bg-white rounded-t-xl sm:rounded-lg shadow-xl w-full h-full sm:h-auto sm:max-w-4xl sm:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-4 sm:p-6 border-b sticky top-0 bg-white z-10">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 pr-4 leading-tight">Start your trip to Kenya</h1>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button variant="ghost" size="sm" className="text-gray-600 hidden sm:flex">
              <HelpCircle className="w-4 h-4 mr-2" />
              Help
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onClose}
              className="text-gray-600 p-2"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 pb-20 sm:pb-6">
          <p className="text-sm text-gray-700 mb-6 sm:mb-8 leading-relaxed">
            All foreign visitors except citizens of EAC member States planning to travel to the Republic of Kenya are required to submit Immigration forms in compliance with Section 48 of the Kenya Citizenship & Immigration Act (No. 12 of 2011). Failure to comply may lead to denied boarding and/or deportation upon arrival.
          </p>

          {/* Traveler Type Cards */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-6">
            {travelerTypes.map((type) => (
              <div
                key={type.id}
                onClick={() => onTravelerTypeClick(type.id)}
                className={`${type.color} text-white rounded-lg p-4 sm:p-6 cursor-pointer hover:opacity-90 transition-opacity touch-manipulation`}
              >
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  {type.icon && <div className="flex-shrink-0">{type.icon}</div>}
                  {type.countries && (
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-4">
                      {type.countries.map((country, idx) => (
                        <div key={idx} className="flex items-center">
                          <FlagIcon country={country} size={20} className="sm:w-6 sm:h-4" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3">{type.title}</h3>
                <p className="text-xs sm:text-sm opacity-90 leading-relaxed">{type.description}</p>
              </div>
            ))}
          </div>

          {/* Diplomat Section */}
          <div className="bg-gray-50 rounded-lg p-4 flex items-start gap-3 sm:gap-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-brand-green/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <div className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-brand-green rounded"></div>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Diplomats and Laissez Passer Holders</h4>
              <p className="text-xs sm:text-sm text-gray-600">Choose this option if you are a holder of Diplomat/Service/Official Passports or a Laissez Passer holder on official duty</p>
            </div>
          </div>
        </div>

        {/* Footer - Fixed at bottom on mobile */}
        <div className="fixed bottom-0 left-0 right-0 sm:relative sm:bottom-auto flex justify-end p-4 sm:p-6 border-t bg-white">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
