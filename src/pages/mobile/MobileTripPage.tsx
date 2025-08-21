
import { MobileTripPage as MobileTripPageComponent } from "@/components/wizard/mobile/MobileTripPage";
import { useMobileApplication } from "@/contexts/MobileApplicationContext";

export default function MobileTripPage() {
  const { form, handleFormChange, country } = useMobileApplication();
  
  return (
    <MobileTripPageComponent 
      form={form} 
      onChange={handleFormChange}
      country={country}
    />
  );
}
