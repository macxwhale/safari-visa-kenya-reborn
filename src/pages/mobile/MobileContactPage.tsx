
import { MobileContactPage as MobileContactPageComponent } from "@/components/wizard/mobile/MobileContactPage";
import { useMobileApplication } from "@/contexts/MobileApplicationContext";

export default function MobileContactPage() {
  const { form, handleFormChange } = useMobileApplication();
  
  return (
    <MobileContactPageComponent 
      form={form} 
      onChange={handleFormChange} 
    />
  );
}
