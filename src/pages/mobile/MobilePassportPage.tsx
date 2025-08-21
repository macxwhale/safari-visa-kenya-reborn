
import { MobilePassportPage as MobilePassportPageComponent } from "@/components/wizard/mobile/MobilePassportPage";
import { useMobileApplication } from "@/contexts/MobileApplicationContext";

export default function MobilePassportPage() {
  const { form, handleFormChange } = useMobileApplication();
  
  return (
    <MobilePassportPageComponent 
      form={form} 
      onChange={handleFormChange} 
    />
  );
}
