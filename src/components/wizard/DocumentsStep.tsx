
import { Input } from "@/components/ui/input";

interface DocumentsStepProps {
  form: {
    doc: File | null;
  };
  onChange: (field: string, value: File | null) => void;
}

export default function DocumentsStep({ form, onChange }: DocumentsStepProps) {
  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <label className="font-medium">Upload Passport Scan or Photo</label>
        <Input
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => onChange('doc', e.target.files?.[0] || null)}
        />
        {form.doc && (
          <div className="mt-2 text-xs text-gray-500">
            Selected: {form.doc.name}
          </div>
        )}
      </div>
    </div>
  );
}
