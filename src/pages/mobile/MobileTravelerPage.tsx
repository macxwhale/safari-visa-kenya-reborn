
import { MobileTravelerPage as MobileTravelerPageComponent } from "@/components/wizard/mobile/MobileTravelerPage";
import { useMobileApplication } from "@/contexts/MobileApplicationContext";

export default function MobileTravelerPage() {
  const { form, handleFormChange } = useMobileApplication();
  
  return (
    <MobileTravelerPageComponent 
      form={form} 
      onChange={handleFormChange} 
    />
  );
}
