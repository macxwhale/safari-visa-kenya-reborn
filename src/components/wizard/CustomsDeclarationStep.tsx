
import { Checkbox } from "@/components/ui/checkbox";

interface CustomsDeclarationStepProps {
  form: {
    customsDeclaration: boolean;
  };
  onChange: (field: string, value: boolean) => void;
}

export default function CustomsDeclarationStep({ form, onChange }: CustomsDeclarationStepProps) {
  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-blue-900">Customs Declaration</h3>
        <p className="text-blue-800 mb-6">
          Please review and confirm the following customs declaration statement:
        </p>
        
        <div className="bg-white border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-700 leading-relaxed">
            I declare that I am not carrying any prohibited items, narcotics, weapons, or items that exceed the customs allowance limits as defined by the Kenya Revenue Authority. I understand that false declaration may result in penalties, confiscation of goods, or denial of entry.
          </p>
        </div>
        
        <div className="flex items-start space-x-3">
          <Checkbox
            id="customs"
            checked={form.customsDeclaration}
            onCheckedChange={(checked) => onChange('customsDeclaration', !!checked)}
          />
          <label htmlFor="customs" className="text-sm text-gray-700 cursor-pointer">
            I have read and agree to the customs declaration statement above *
          </label>
        </div>
      </div>
    </div>
  );
}
