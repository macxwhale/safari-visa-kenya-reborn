
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import React from 'react';
import { ApplicationFormState } from "@/hooks/useApplicationForm";

interface DocumentsStepProps {
  form: ApplicationFormState;
  onChange: (field: keyof ApplicationFormState, value: any) => void;
}

export default function DocumentsStep({ form, onChange }: DocumentsStepProps) {
  const accommodationInputRef = React.useRef<HTMLInputElement>(null);
  const airlineInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>, field: 'accommodationDocs' | 'airlineDocs') => {
    const files = Array.from(event.target.files || []);
    onChange(field, [...form[field], ...files]);
  };

  const removeFile = (index: number, field: 'accommodationDocs' | 'airlineDocs') => {
    const newFiles = form[field].filter((_, i) => i !== index);
    onChange(field, newFiles);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h2 className="text-xl font-semibold mb-2 text-gray-900">Required Documents</h2>
        <p className="text-sm text-gray-500 mb-6">Please upload the required document(s) below.</p>
      </div>

      <div className="p-6 border rounded-lg bg-gray-50/50 space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Accommodation Booking Confirmations</h3>
        <p className="text-sm text-gray-600">
          Upload your booking confirmation(s) for your place of stay. This must include the name of the hotel/guesthouse. If you're visiting friends and family, provide the name, ID or passport number, and mobile phone number of your host.
        </p>
        
        <Input
          ref={accommodationInputRef}
          type="file"
          accept="image/*,application/pdf"
          multiple
          onChange={(e) => handleFileSelect(e, 'accommodationDocs')}
          className="hidden"
        />
        <Button type="button" variant="outline" onClick={() => accommodationInputRef.current?.click()}>
          + Add Another
        </Button>
        
        {form.accommodationDocs.length > 0 && (
          <div className="space-y-2 pt-2">
            {form.accommodationDocs.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                <span className="text-sm text-gray-700 truncate pr-2">{file.name}</span>
                <div className="flex items-center space-x-1 flex-shrink-0">
                  <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                    <a href={URL.createObjectURL(file)} target="_blank" rel="noopener noreferrer">
                      <Eye className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(index, 'accommodationDocs')}
                    className="h-8 w-8 text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-6 border rounded-lg bg-gray-50/50 space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Airline/Cruise Booking Confirmation</h3>
        <p className="text-sm text-gray-600">
          Upload your airline/cruise booking confirmation(s) which clearly shows your name and arrival/departure details.
        </p>
        
        <Input
          ref={airlineInputRef}
          type="file"
          accept="image/*,application/pdf"
          multiple
          onChange={(e) => handleFileSelect(e, 'airlineDocs')}
          className="hidden"
        />
        <Button type="button" variant="outline" onClick={() => airlineInputRef.current?.click()}>
          + Add Another
        </Button>
        
        {form.airlineDocs.length > 0 && (
          <div className="space-y-2 pt-2">
            {form.airlineDocs.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                <span className="text-sm text-gray-700 truncate pr-2">{file.name}</span>
                <div className="flex items-center space-x-1 flex-shrink-0">
                   <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                     <a href={URL.createObjectURL(file)} target="_blank" rel="noopener noreferrer">
                       <Eye className="h-4 w-4" />
                     </a>
                   </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(index, 'airlineDocs')}
                    className="h-8 w-8 text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
