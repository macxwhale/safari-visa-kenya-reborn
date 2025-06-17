
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

  // Show application form as modal overlay
  console.log("Showing ApplicationForm");
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Blurred background content */}
      <div className="blur-sm pointer-events-none">
        <div className="h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Kenya eTA Application</h1>
            <p className="text-lg text-gray-600">Complete your travel authorization</p>
          </div>
        </div>
      </div>
      
      {/* Application form overlay */}
      <ApplicationForm 
        travelerType={applicationData.travelerType}
        applicationType={applicationData.applicationType}
        country={applicationData.country}
        onReset={handleReset}
      />
    </div>
  );
}
