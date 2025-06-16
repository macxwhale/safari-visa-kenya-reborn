
import { useState, useEffect } from "react";
import HowToApplyModal from "./HowToApplyModal";
import DeclarationModal from "./DeclarationModal";
import ApplicationTypeModal from "./ApplicationTypeModal";
import CountryResidenceModal from "./CountryResidenceModal";
import TravelerTypeSelectionUI from "./TravelerTypeSelectionUI";
import CompletionModal from "./CompletionModal";
import { TravelerTypeSelectionProps, ModalState, ApplicationData } from "./types";

export default function TravelerTypeSelection({ onTravelerTypeSelect, onClose }: TravelerTypeSelectionProps) {
  const [currentModal, setCurrentModal] = useState<ModalState>("main");
  const [selectedData, setSelectedData] = useState<ApplicationData>({
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
    console.log("Final data collected:", updatedData);
    
    // Set state to complete and show completion modal briefly
    setCurrentModal("complete");
    
    // After a brief delay, proceed to the application form
    setTimeout(() => {
      console.log("Proceeding to ApplicationForm with data:", updatedData);
      onTravelerTypeSelect(updatedData.travelerType, updatedData.applicationType, country);
    }, 1500); // Show completion modal for 1.5 seconds
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
    } else if (currentModal === "complete") {
      setCurrentModal("countryResidence");
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

  if (currentModal === "complete") {
    console.log("Rendering completion state");
    return <CompletionModal />;
  }

  // Main traveler type selection
  console.log("Rendering main modal");
  return (
    <TravelerTypeSelectionUI 
      onTravelerTypeClick={handleTravelerTypeClick}
      onClose={onClose}
    />
  );
}
