
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

  // Add useEffect to log state changes with error tracking
  useEffect(() => {
    console.log("Modal state changed to:", currentModal);
    console.log("Selected data:", selectedData);
  }, [currentModal, selectedData]);

  const handleTravelerTypeClick = (typeId: string) => {
    console.log("Traveler type clicked:", typeId);
    try {
      if (typeId === "tourist") {
        setSelectedData(prev => ({ ...prev, travelerType: typeId }));
        setCurrentModal("howToApply");
      } else {
        onTravelerTypeSelect(typeId);
      }
    } catch (error) {
      console.error("Error in handleTravelerTypeClick:", error);
    }
  };

  const handleContinueFromHowToApply = () => {
    console.log("=== CONTINUE FROM HOW TO APPLY TRIGGERED ===");
    console.log("Current state before update:", currentModal);
    try {
      setCurrentModal("declaration");
      console.log("State update called - should transition to declaration");
    } catch (error) {
      console.error("Error transitioning from HowToApply:", error);
    }
  };

  const handleContinueFromDeclaration = () => {
    console.log("Continuing from Declaration modal");
    try {
      setCurrentModal("applicationType");
    } catch (error) {
      console.error("Error transitioning from Declaration:", error);
    }
  };

  const handleApplicationTypeSelect = (type: 'individual' | 'group') => {
    console.log("Application type selected:", type);
    try {
      setSelectedData(prev => ({ ...prev, applicationType: type }));
      setCurrentModal("countryResidence");
    } catch (error) {
      console.error("Error in handleApplicationTypeSelect:", error);
    }
  };

  const handleCountrySelect = (country: string) => {
    console.log("Country selected:", country);
    try {
      const updatedData = { ...selectedData, country };
      setSelectedData(updatedData);
      console.log("Final data collected:", updatedData);
      
      // Set state to complete and show completion modal briefly
      setCurrentModal("complete");
      
      // After a brief delay, proceed to the application form
      setTimeout(() => {
        console.log("Proceeding to ApplicationForm with data:", updatedData);
        try {
          onTravelerTypeSelect(updatedData.travelerType, updatedData.applicationType, country);
        } catch (error) {
          console.error("Error calling onTravelerTypeSelect:", error);
        }
      }, 1000); // Reduced to 1 second for faster transition
    } catch (error) {
      console.error("Error in handleCountrySelect:", error);
    }
  };

  const handleBack = () => {
    console.log("Back button clicked from:", currentModal);
    try {
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
    } catch (error) {
      console.error("Error in handleBack:", error);
    }
  };

  const handleClose = () => {
    console.log("Close button clicked");
    try {
      onClose();
    } catch (error) {
      console.error("Error in handleClose:", error);
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
        onClose={handleClose}
        onContinue={handleContinueFromHowToApply}
        onBack={handleBack}
      />
    );
  }

  if (currentModal === "declaration") {
    console.log("Rendering DeclarationModal");
    return (
      <DeclarationModal
        onClose={handleClose}
        onContinue={handleContinueFromDeclaration}
        onBack={handleBack}
      />
    );
  }

  if (currentModal === "applicationType") {
    console.log("Rendering ApplicationTypeModal");
    return (
      <ApplicationTypeModal
        onClose={handleClose}
        onTypeSelect={handleApplicationTypeSelect}
        onBack={handleBack}
      />
    );
  }

  if (currentModal === "countryResidence") {
    console.log("Rendering CountryResidenceModal");
    return (
      <CountryResidenceModal
        onClose={handleClose}
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
      onClose={handleClose}
    />
  );
}
