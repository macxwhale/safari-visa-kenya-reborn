
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
    const newData = {
      travelerType: type,
      applicationType: applicationType || "",
      country: country || ""
    };
    setApplicationData(newData);
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

  return (
    <div className="relative min-h-screen">
      <div className={`${applicationData.travelerType ? 'blur-sm' : ''} transition-all duration-300`}>
        <Index />
      </div>
      
      {!applicationData.travelerType && (
        <TravelerTypeSelection 
          onTravelerTypeSelect={handleTravelerTypeSelect}
          onClose={handleClose}
        />
      )}
      
      {applicationData.travelerType && (
        <ApplicationForm 
          travelerType={applicationData.travelerType}
          applicationType={applicationData.applicationType}
          country={applicationData.country}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
