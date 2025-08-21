
import { createContext, useContext, ReactNode } from "react";
import { useApplicationForm, ApplicationFormState } from "@/hooks/useApplicationForm";

interface MobileApplicationContextType {
  form: ApplicationFormState;
  handleFormChange: (field: keyof ApplicationFormState, value: any) => void;
  travelerType: string;
  applicationType?: string;
  country?: string;
}

const MobileApplicationContext = createContext<MobileApplicationContextType | undefined>(undefined);

interface MobileApplicationProviderProps {
  children: ReactNode;
  travelerType: string;
  applicationType?: string;
  country?: string;
}

export const MobileApplicationProvider: React.FC<MobileApplicationProviderProps> = ({
  children,
  travelerType,
  applicationType,
  country
}) => {
  const { form, handleFormChange } = useApplicationForm(country || "");

  return (
    <MobileApplicationContext.Provider 
      value={{ 
        form, 
        handleFormChange, 
        travelerType, 
        applicationType, 
        country 
      }}
    >
      {children}
    </MobileApplicationContext.Provider>
  );
};

export const useMobileApplication = () => {
  const context = useContext(MobileApplicationContext);
  if (context === undefined) {
    throw new Error('useMobileApplication must be used within a MobileApplicationProvider');
  }
  return context;
};
