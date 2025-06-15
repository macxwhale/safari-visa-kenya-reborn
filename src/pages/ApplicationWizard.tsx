
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TravelerTypeSelection from "@/components/wizard/TravelerTypeSelection";
import ApplicationForm from "@/components/wizard/ApplicationForm";

export default function ApplicationWizard() {
  const [travelerType, setTravelerType] = useState<string>("");
  const navigate = useNavigate();

  const handleTravelerTypeSelect = (type: string) => {
    setTravelerType(type);
  };

  const handleReset = () => {
    setTravelerType("");
  };

  const handleClose = () => {
    navigate("/");
  };

  if (!travelerType) {
    return (
      <TravelerTypeSelection 
        onTravelerTypeSelect={handleTravelerTypeSelect}
        onClose={handleClose}
      />
    );
  }

  return (
    <ApplicationForm 
      travelerType={travelerType}
      onReset={handleReset}
    />
  );
}
