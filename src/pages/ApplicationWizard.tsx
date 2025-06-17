
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
    const newData = {
      travelerType: type,
      applicationType: applicationType || "",
      country: country || ""
    };
    console.log("Setting application data:", newData);
    setApplicationData(newData);
  };

  const handleReset = () => {
    console.log("Resetting application data");
    setApplicationData({
      travelerType: "",
      applicationType: "",
      country: ""
    });
  };

  const handleClose = () => {
    navigate("/");
  };

  console.log("ApplicationWizard render - applicationData:", applicationData);

  // Show wizard modals if no traveler type is selected
  if (!applicationData.travelerType) {
    console.log("Showing TravelerTypeSelection");
    return (
      <TravelerTypeSelection 
        onTravelerTypeSelect={handleTravelerTypeSelect}
        onClose={handleClose}
      />
    );
  }

  // Show application form with Index page as background
  console.log("Showing ApplicationForm");
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
