
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TravelerTypeSelection from "@/components/wizard/TravelerTypeSelection";
import ApplicationForm from "@/components/wizard/ApplicationForm";
import Index from "./Index";

export default function ApplicationWizard() {
  const [applicationData, setApplicationData] = useState({
    travelerType: "",
    applicationType: "",
    country: ""
  });
  const navigate = useNavigate();

  const handleTravelerTypeSelect = (type: string, applicationType?: string, country?: string) => {
    console.log("ApplicationWizard received data:", { type, applicationType, country });
    setApplicationData({
      travelerType: type,
      applicationType: applicationType || "",
      country: country || ""
    });
  };

  const handleReset = () => {
    setApplicationData({
      travelerType: "",
      applicationType: "",
      country: ""
    });
  };

  const handleClose = () => {
    navigate("/");
  };

  // Show wizard modals if no traveler type is selected
  if (!applicationData.travelerType) {
    return (
      <TravelerTypeSelection 
        onTravelerTypeSelect={handleTravelerTypeSelect}
        onClose={handleClose}
      />
    );
  }

  // Show application form with Index page as background
  return (
    <>
      <Index />
      <ApplicationForm 
        travelerType={applicationData.travelerType}
        applicationType={applicationData.applicationType}
        country={applicationData.country}
        onReset={handleReset}
      />
    </>
  );
}
