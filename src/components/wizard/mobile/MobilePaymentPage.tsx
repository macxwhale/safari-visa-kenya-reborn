
import { useNavigate } from "react-router-dom";
import { MobilePageLayout } from "./MobilePageLayout";
import PaymentStep from "../PaymentStep";
import { ApplicationFormState } from "@/hooks/useApplicationForm";

interface MobilePaymentPageProps {
  form: ApplicationFormState;
  applicationId: string | null;
}

export const MobilePaymentPage: React.FC<MobilePaymentPageProps> = ({
  form,
  applicationId
}) => {
  const navigate = useNavigate();

  console.log("MobilePaymentPage rendered with applicationId:", applicationId);

  const handleBack = () => {
    navigate("/application/documents");
  };

  return (
    <MobilePageLayout
      title="Payment"
      subtitle="Complete your payment to process your ETA application"
      currentStep={6}
      totalSteps={7}
      onBack={handleBack}
      showBackButton={true}
    >
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Application Submitted Successfully</h3>
          <p className="text-sm text-blue-700">
            Your application has been saved. Complete the payment below to process your ETA.
          </p>
          {applicationId && (
            <p className="text-xs text-blue-600 mt-2">
              Application ID: {applicationId}
            </p>
          )}
        </div>
        
        <PaymentStep 
          form={form}
          applicationId={applicationId}
        />
      </div>
    </MobilePageLayout>
  );
};
