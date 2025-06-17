
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { useState } from "react";
import CountrySearchInput from "./country/CountrySearchInput";
import CountryList from "./country/CountryList";
import ModalWrapper from "./ModalWrapper";

interface CountryResidenceModalProps {
  onClose: () => void;
  onCountrySelect: (country: string) => void;
  onBack: () => void;
}

export default function CountryResidenceModal({ onClose, onCountrySelect, onBack }: CountryResidenceModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  console.log("CountryResidenceModal render - selectedCountry:", selectedCountry);

  const handleContinue = () => {
    console.log("Continue button clicked with country:", selectedCountry);
    if (selectedCountry) {
      try {
        onCountrySelect(selectedCountry);
      } catch (error) {
        console.error("Error in handleContinue:", error);
      }
    } else {
      console.warn("No country selected - button should be disabled");
    }
  };

  const handleCountrySelect = (country: string) => {
    console.log("Country selected in modal:", country);
    setSelectedCountry(country);
  };

  const handleBack = () => {
    console.log("Back button clicked in CountryResidenceModal");
    try {
      onBack();
    } catch (error) {
      console.error("Error in handleBack:", error);
    }
  };

  const handleClose = () => {
    console.log("Close button clicked in CountryResidenceModal");
    try {
      onClose();
    } catch (error) {
      console.error("Error in handleClose:", error);
    }
  };

  return (
    <ModalWrapper onClose={handleClose} className="max-w-2xl">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between p-8 pb-0 flex-shrink-0">
          <div className="flex-1 pr-4">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Country of Residence</h1>
            <p className="mb-4 text-[15px] text-gray-800 leading-relaxed">
              Please select your country of residence. This is the country where you live and pay taxes. If you are a resident Diplomat of Kenya, please select Kenya.
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-700 flex items-center gap-2 bg-gray-100 px-3 py-2 flex-shrink-0"
            tabIndex={-1}
            type="button"
          >
            <HelpCircle className="w-5 h-5" />
            Help
          </Button>
        </div>

        {/* Search Input */}
        <div className="px-8 mt-6 mb-3 flex-shrink-0">
          <CountrySearchInput searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>

        {/* Country List - scrollable */}
        <div className="px-8 flex-1 overflow-y-auto">
          <CountryList 
            searchTerm={searchTerm}
            selectedCountry={selectedCountry}
            onCountrySelect={handleCountrySelect}
          />
        </div>

        {/* Footer - always visible */}
        <div className="flex justify-between items-center px-8 py-6 border-t bg-gray-50 flex-shrink-0">
          <Button 
            variant="outline" 
            onClick={handleClose} 
            className="rounded-full px-6 py-2 border-gray-300 text-gray-700"
          >
            Close
          </Button>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={handleBack} 
              className="rounded-full px-6 py-2 border-gray-300 text-gray-700"
            >
              Back
            </Button>
            <Button
              onClick={handleContinue}
              disabled={!selectedCountry}
              className={`rounded-full px-8 py-2 font-semibold text-white transition-all duration-200 ${
                selectedCountry 
                  ? "bg-brand-green hover:bg-brand-green/90 shadow-lg hover:shadow-xl" 
                  : "bg-gray-300 cursor-not-allowed opacity-50"
              }`}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}
