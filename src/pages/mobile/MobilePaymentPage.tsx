
import { useMobileApplication } from "@/contexts/MobileApplicationContext";
import { MobilePaymentPage as MobilePaymentPageComponent } from "@/components/wizard/mobile/MobilePaymentPage";
import { useSearchParams } from "react-router-dom";

export default function MobilePaymentPage() {
  const { form } = useMobileApplication();
  const [searchParams] = useSearchParams();
  const applicationId = searchParams.get('id');

  console.log("Mobile payment page loaded with application ID:", applicationId);

  return (
    <MobilePaymentPageComponent 
      form={form}
      applicationId={applicationId}
    />
  );
}
