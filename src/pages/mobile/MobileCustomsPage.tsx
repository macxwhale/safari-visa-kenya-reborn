
import { MobileCustomsPage as MobileCustomsPageComponent } from "@/components/wizard/mobile/MobileCustomsPage";
import { useMobileApplication } from "@/contexts/MobileApplicationContext";

export default function MobileCustomsPage() {
  const { form, handleFormChange } = useMobileApplication();
  
  return (
    <MobileCustomsPageComponent 
      form={form} 
      onChange={handleFormChange} 
    />
  );
}
