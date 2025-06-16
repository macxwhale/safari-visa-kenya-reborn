
import { Button } from "@/components/ui/button";
import { X, Globe, HelpCircle } from "lucide-react";
import { useState, useEffect } from "react";
import HowToApplyModal from "./HowToApplyModal";
import DeclarationModal from "./DeclarationModal";
import ApplicationTypeModal from "./ApplicationTypeModal";
import CountryResidenceModal from "./CountryResidenceModal";

interface TravelerTypeSelectionProps {
  onTravelerTypeSelect: (type: string, applicationType?: string, country?: string) => void;
  onClose: () => void;
}

const travelerTypes = [
  {
    id: "tourist",
    title: "Tourists & Visitors",
    description: "If you are visiting Kenya for tourism, business, or visiting for any other reason to apply for your travel authorisation.",
    color: "bg-brand-green",
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
  const [currentModal, setCurrentModal] = useState<"main" | "howToApply" | "declaration" | "applicationType" | "countryResidence">("main");
  const [selectedData, setSelectedData] = useState({
    travelerType: "",
    applicationType: "",
    country: ""
  });

  // Add useEffect to log state changes
  useEffect(() => {
    console.log("Modal state changed to:", currentModal);
  }, [currentModal]);

  const handleTravelerTypeClick = (typeId: string) => {
    console.log("Traveler type clicked:", typeId);
    if (typeId === "tourist") {
      setSelectedData(prev => ({ ...prev, travelerType: typeId }));
      setCurrentModal("howToApply");
    } else {
      onTravelerTypeSelect(typeId);
    }
  };

  const handleContinueFromHowToApply = () => {
    console.log("=== CONTINUE FROM HOW TO APPLY TRIGGERED ===");
    console.log("Current state before update:", currentModal);
    setCurrentModal("declaration");
    console.log("State update called - should transition to declaration");
  };

  const handleContinueFromDeclaration = () => {
    console.log("Continuing from Declaration modal");
    setCurrentModal("applicationType");
  };

  const handleApplicationTypeSelect = (type: 'individual' | 'group') => {
    console.log("Application type selected:", type);
    setSelectedData(prev => ({ ...prev, applicationType: type }));
    setCurrentModal("countryResidence");
  };

  const handleCountrySelect = (country: string) => {
    console.log("Country selected:", country);
    const updatedData = { ...selectedData, country };
    setSelectedData(updatedData);
    console.log("Final data being passed:", updatedData);
    // Now pass all the collected data to complete the selection
    onTravelerTypeSelect(updatedData.travelerType, updatedData.applicationType, country);
  };

  const handleBack = () => {
    console.log("Back button clicked from:", currentModal);
    if (currentModal === "howToApply") {
      setCurrentModal("main");
    } else if (currentModal === "declaration") {
      setCurrentModal("howToApply");
    } else if (currentModal === "applicationType") {
      setCurrentModal("declaration");
    } else if (currentModal === "countryResidence") {
      setCurrentModal("applicationType");
    }
  };

  console.log("=== RENDER ===");
  console.log("Current modal state:", currentModal);
  console.log("Selected data:", selectedData);

  // Render appropriate modal based on current state
  if (currentModal === "howToApply") {
    console.log("Rendering HowToApplyModal");
    return (
      <HowToApplyModal
        onClose={onClose}
        onContinue={handleContinueFromHowToApply}
        onBack={handleBack}
      />
    );
  }

  if (currentModal === "declaration") {
    console.log("Rendering DeclarationModal");
    return (
      <DeclarationModal
        onClose={onClose}
        onContinue={handleContinueFromDeclaration}
        onBack={handleBack}
      />
    );
  }

  if (currentModal === "applicationType") {
    console.log("Rendering ApplicationTypeModal");
    return (
      <ApplicationTypeModal
        onClose={onClose}
        onTypeSelect={handleApplicationTypeSelect}
        onBack={handleBack}
      />
    );
  }

  if (currentModal === "countryResidence") {
    console.log("Rendering CountryResidenceModal");
    return (
      <CountryResidenceModal
        onClose={onClose}
        onCountrySelect={handleCountrySelect}
        onBack={handleBack}
      />
    );
  }

  // Main traveler type selection
  console.log("Rendering main modal");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Modal overlay */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
      
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
            <div className="w-12 h-12 bg-brand-green/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <div className="w-8 h-8 bg-brand-green rounded"></div>
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
