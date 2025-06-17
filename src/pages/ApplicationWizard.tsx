
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
    console.log("Closing application wizard");
    navigate("/");
  };

  console.log("ApplicationWizard render - applicationData:", applicationData);

  return (
    <div className="relative min-h-screen">
      {/* Main page background - always rendered */}
      <div className={`${applicationData.travelerType ? 'blur-sm' : ''} transition-all duration-300`}>
        <Index />
      </div>
      
      {/* Modal overlays */}
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
