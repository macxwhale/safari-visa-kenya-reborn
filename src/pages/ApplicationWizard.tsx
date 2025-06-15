
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TravelerTypeSelection from "@/components/wizard/TravelerTypeSelection";
import ApplicationForm from "@/components/wizard/ApplicationForm";

export default function ApplicationWizard() {
  const [applicationData, setApplicationData] = useState({
    travelerType: "",
    applicationType: "",
    country: ""
  });
  const navigate = useNavigate();

  const handleTravelerTypeSelect = (type: string, applicationType?: string, country?: string) => {
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

  if (!applicationData.travelerType) {
    return (
      <TravelerTypeSelection 
        onTravelerTypeSelect={handleTravelerTypeSelect}
        onClose={handleClose}
      />
    );
  }

  return (
    <ApplicationForm 
      travelerType={applicationData.travelerType}
      applicationType={applicationData.applicationType}
      country={applicationData.country}
      onReset={handleReset}
    />
  );
}
