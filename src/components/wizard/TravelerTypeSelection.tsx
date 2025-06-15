
import { Button } from "@/components/ui/button";
import { X, Globe, HelpCircle } from "lucide-react";
import { useState } from "react";
import HowToApplyModal from "./HowToApplyModal";

interface TravelerTypeSelectionProps {
  onTravelerTypeSelect: (type: string) => void;
  onClose: () => void;
}

const travelerTypes = [
  {
    id: "tourist",
    title: "Tourists & Visitors",
    description: "If you are visiting Kenya for tourism, business, or visiting for any other reason to apply for your travel authorisation.",
    color: "bg-green-600",
    icon: <Globe className="w-12 h-12 text-white" />
  },
  {
    id: "eac-passport",
    title: "Kenya & East African Partner State Passport Holders",
    description: "As of early 2025, citizens of Kenya & East African Partner States Passport Holders countries can enter Kenya without a visa",
    color: "bg-orange-500",
    flags: ["🇰🇪", "🇹🇿", "🇺🇬", "🇷🇼", "🇧🇮", "🇨🇩", "🇸🇸"]
  }
];

export default function TravelerTypeSelection({ onTravelerTypeSelect, onClose }: TravelerTypeSelectionProps) {
  const [showHowToApply, setShowHowToApply] = useState(false);

  const handleTravelerTypeClick = (typeId: string) => {
    if (typeId === "tourist") {
      setShowHowToApply(true);
    } else {
      onTravelerTypeSelect(typeId);
    }
  };

  const handleContinueFromModal = () => {
    setShowHowToApply(false);
    onTravelerTypeSelect("tourist");
  };

  const handleBackFromModal = () => {
    setShowHowToApply(false);
  };

  if (showHowToApply) {
    return (
      <HowToApplyModal
        onClose={onClose}
        onContinue={handleContinueFromModal}
        onBack={handleBackFromModal}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Modal overlay */}
      <div className="fixed inset-0 bg-black/50 z-40"></div>
      
      {/* Modal content */}
      <div className="relative z-50 bg-white rounded-lg shadow-xl max-w-4xl w-full mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-900">Start your trip to Kenya</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-gray-600">
              <HelpCircle className="w-4 h-4 mr-2" />
              Help
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onClose}
              className="text-gray-600"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-sm text-gray-700 mb-8 leading-relaxed">
            All foreign visitors except citizens of EAC member States planning to travel to the Republic of Kenya are required to submit Immigration forms in compliance with Section 48 of the Kenya Citizenship & Immigration Act (No. 12 of 2011). Failure to comply may lead to denied boarding and/or deportation upon arrival.
          </p>

          {/* Traveler Type Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {travelerTypes.map((type) => (
              <div
                key={type.id}
                onClick={() => handleTravelerTypeClick(type.id)}
                className={`${type.color} text-white rounded-lg p-6 cursor-pointer hover:opacity-90 transition-opacity`}
              >
                <div className="flex items-start gap-4">
                  {type.icon && <div className="flex-shrink-0">{type.icon}</div>}
                  {type.flags && (
                    <div className="flex gap-1 mb-4">
                      {type.flags.map((flag, idx) => (
                        <span key={idx} className="text-2xl">{flag}</span>
                      ))}
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-3">{type.title}</h3>
                <p className="text-sm opacity-90 leading-relaxed">{type.description}</p>
              </div>
            ))}
          </div>

          {/* Diplomat Section */}
          <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <div className="w-8 h-8 bg-green-600 rounded"></div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Diplomats and Laissez Passer Holders</h4>
              <p className="text-sm text-gray-600">Choose this option if you are a holder of Diplomat/Service/Official Passports or a Laissez Passer holder on official duty</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
