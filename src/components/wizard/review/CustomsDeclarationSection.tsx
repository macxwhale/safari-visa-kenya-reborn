
import { ApplicationFormState } from "@/hooks/useApplicationForm";
import { formatBoolean } from "./reviewUtils";

interface CustomsDeclarationSectionProps {
  form: ApplicationFormState;
}

export default function CustomsDeclarationSection({ form }: CustomsDeclarationSectionProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-medium text-gray-900 mb-3">Customs Declaration</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Bringing currency over $5000:</span>
          <span className="font-medium text-gray-900">
            {formatBoolean(form.bringingCurrencyOver5000)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Declaration confirmed:</span>
          <span className={`font-medium ${form.customsDeclaration ? 'text-green-600' : 'text-red-600'}`}>
            {formatBoolean(form.customsDeclaration)}
          </span>
        </div>
      </div>
    </div>
  );
}
