
import { Checkbox } from "@/components/ui/checkbox";
import { ApplicationFormState } from "@/hooks/useApplicationForm";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface CustomsDeclarationStepProps {
  form: ApplicationFormState;
  onChange: (field: keyof ApplicationFormState, value: any) => void;
}

export default function CustomsDeclarationStep({ form, onChange }: CustomsDeclarationStepProps) {
  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-2 text-blue-900">Customs Declaration</h3>
        <p className="text-blue-800 mb-6">
          Answer a few questions related to biosecurity, customs and law enforcement.
        </p>
        
        <div className="space-y-8">
          <div>
            <Label className="text-sm font-medium text-gray-700 block mb-2">
              Will you be bringing into Republic of Kenya currency or monetary instruments of a value greater than $5000 or foreign equivalent? *
            </Label>
            <RadioGroup
              value={form.bringingCurrencyOver5000 === null ? "" : String(form.bringingCurrencyOver5000)}
              onValueChange={(value) => {
                const val = value === "true" ? true : (value === "false" ? false : null);
                onChange('bringingCurrencyOver5000', val);
              }}
              className="flex items-center space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="currency-yes" />
                <Label htmlFor="currency-yes" className="font-normal cursor-pointer">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="currency-no" />
                <Label htmlFor="currency-no" className="font-normal cursor-pointer">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
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
      </div>
    </div>
  );
}
