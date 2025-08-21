
import { useNavigate } from "react-router-dom";
import { MobilePageLayout } from "./MobilePageLayout";
import CustomsDeclarationStep from "../CustomsDeclarationStep";
import { ApplicationFormState } from "@/hooks/useApplicationForm";

interface MobileCustomsPageProps {
  form: ApplicationFormState;
  onChange: (field: string, value: any) => void;
}

export const MobileCustomsPage: React.FC<MobileCustomsPageProps> = ({
  form,
  onChange
}) => {
  const navigate = useNavigate();

  const isFormValid = form.customsDeclaration !== null && 
                     form.bringingCurrencyOver5000 !== null;

  const handleNext = () => {
    if (isFormValid) {
      navigate("/application/documents");
    }
  };

  const handleBack = () => {
    navigate("/application/traveler");
  };

  return (
    <MobilePageLayout
      title="Customs Declaration"
      subtitle="Declaration of goods and currency for customs purposes"
      currentStep={5}
      totalSteps={9}
      onNext={handleNext}
      onBack={handleBack}
      nextButtonText="Continue to Documents"
      nextButtonDisabled={!isFormValid}
    >
      <CustomsDeclarationStep form={form} onChange={onChange} />
    </MobilePageLayout>
  );
};
