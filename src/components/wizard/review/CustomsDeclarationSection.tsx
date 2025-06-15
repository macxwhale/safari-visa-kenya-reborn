
import { ApplicationFormState } from "@/hooks/useApplicationForm";

interface CustomsDeclarationSectionProps {
  form: ApplicationFormState;
}

export default function CustomsDeclarationSection({ form }: CustomsDeclarationSectionProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-medium text-gray-900 mb-3">Customs Declaration</h3>
      <div className="text-sm">
        <span className="text-gray-600">Declaration Status:</span>
        <span className={`ml-2 font-medium ${form.customsDeclaration ? 'text-green-600' : 'text-red-600'}`}>
          {form.customsDeclaration ? "Confirmed" : "Not confirmed"}
        </span>
      </div>
    </div>
  );
}
