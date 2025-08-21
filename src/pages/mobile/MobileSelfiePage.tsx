
import { MobileSelfiePage as MobileSelfiePageComponent } from "@/components/wizard/mobile/MobileSelfiePage";
import { useMobileApplication } from "@/contexts/MobileApplicationContext";

export default function MobileSelfiePage() {
  const { form, handleFormChange } = useMobileApplication();
  
  return (
    <MobileSelfiePageComponent 
      form={form} 
      onChange={handleFormChange} 
    />
  );
}
