
import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import TravelerTypeSelection from "@/components/wizard/TravelerTypeSelection";
import ApplicationForm from "@/components/wizard/ApplicationForm";
import { MobileApplicationProvider } from "@/contexts/MobileApplicationContext";
import Index from "./Index";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ApplicationWizard() {
  const [applicationData, setApplicationData] = useState({
    travelerType: "",
    applicationType: "",
    country: ""
  });
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleTravelerTypeSelect = (type: string, applicationType?: string, country?: string) => {
    const newData = {
      travelerType: type,
      applicationType: applicationType || "",
      country: country || ""
    };
    setApplicationData(newData);
    
    // For mobile, navigate directly to the first step
    if (isMobile) {
      navigate("/application/passport");
    }
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

  // If mobile and traveler type is selected, provide context for mobile pages
  if (isMobile && applicationData.travelerType) {
    return (
      <MobileApplicationProvider
        travelerType={applicationData.travelerType}
        applicationType={applicationData.applicationType}
        country={applicationData.country}
      >
        <Outlet />
      </MobileApplicationProvider>
    );
  }

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
      
      {applicationData.travelerType && !isMobile && (
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
