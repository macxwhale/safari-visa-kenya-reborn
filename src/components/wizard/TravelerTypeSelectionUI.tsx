
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
    icon: <Globe className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
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
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300" />
      
      {/* Modal content */}
      <div className="relative z-50 bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full h-full sm:h-auto sm:max-w-5xl sm:max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between p-6 sm:p-8 border-b border-gray-100 flex-shrink-0 bg-white">
          <div className="flex-1 pr-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
              Start your trip to Kenya
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-3xl">
              All foreign visitors except citizens of EAC member States planning to travel to the Republic of Kenya are required to submit Immigration forms in compliance with Section 48 of the Kenya Citizenship & Immigration Act (No. 12 of 2011). Failure to comply may lead to denied boarding and/or deportation upon arrival.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 hidden sm:flex items-center gap-2 px-3 py-2">
              <HelpCircle className="w-4 h-4" />
              <span className="text-sm">Help</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 pb-24 sm:pb-8">
          {/* Traveler Type Cards */}
          <div className="grid grid-cols-1 gap-6 mb-8">
            {travelerTypes.map((type) => (
              <div
                key={type.id}
                onClick={() => onTravelerTypeClick(type.id)}
                className={`${type.color} text-white rounded-2xl p-6 sm:p-8 cursor-pointer hover:opacity-95 hover:scale-[1.02] transition-all duration-200 touch-manipulation shadow-lg`}
              >
                <div className="flex items-start gap-4 sm:gap-6 mb-4">
                  {type.icon && <div className="flex-shrink-0 mt-1">{type.icon}</div>}
                  {type.countries && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {type.countries.map((country, idx) => (
                        <div key={idx} className="flex items-center bg-white/20 rounded-lg p-2">
                          <FlagIcon country={country} size={24} className="w-6 h-4 sm:w-8 sm:h-6" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">{type.title}</h3>
                  <p className="text-sm sm:text-base opacity-95 leading-relaxed">{type.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Diplomat Section */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <div className="flex items-start gap-4 sm:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-brand-green/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-brand-green rounded-lg"></div>
              </div>
              <div className="flex-1 space-y-2">
                <h4 className="font-bold text-gray-900 text-base sm:text-lg">
                  Diplomats and Laissez Passer Holders
                </h4>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Choose this option if you are a holder of Diplomat/Service/Official Passports or a Laissez Passer holder on official duty
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="fixed bottom-0 left-0 right-0 sm:relative sm:bottom-auto flex justify-end p-6 sm:p-8 border-t border-gray-100 bg-white flex-shrink-0">
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="w-full sm:w-auto px-8 py-3 font-medium border-gray-300 hover:bg-gray-50"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
