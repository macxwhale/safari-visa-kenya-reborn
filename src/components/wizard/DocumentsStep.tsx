
import { Input } from "@/components/ui/input";

interface DocumentsStepProps {
  form: {
    additionalDocs: File[];
  };
  onChange: (field: string, value: File[]) => void;
}

export default function DocumentsStep({ form, onChange }: DocumentsStepProps) {
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    onChange('additionalDocs', [...form.additionalDocs, ...files]);
  };

  const removeFile = (index: number) => {
    const newFiles = form.additionalDocs.filter((_, i) => i !== index);
    onChange('additionalDocs', newFiles);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Supporting Documents
        </label>
        <p className="text-gray-600 text-sm mb-4">
          Upload any additional documents that support your application (optional)
        </p>
        <Input
          type="file"
          accept="image/*,application/pdf"
          multiple
          onChange={handleFileSelect}
          className="mb-4"
        />
        
        {form.additionalDocs.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Uploaded Documents:</h4>
            {form.additionalDocs.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <span className="text-sm text-gray-700">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
