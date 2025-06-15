
import { Button } from "@/components/ui/button";
import { CreditCard, Banknote } from "lucide-react";

interface PaymentStepProps {
  form: any;
  onChange: (field: string, value: any) => void;
}

export default function PaymentStep({ form, onChange }: PaymentStepProps) {
  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-green-900">Payment Information</h3>
        
        <div className="mb-6">
          <div className="flex justify-between items-center py-3 border-b">
            <span className="text-gray-700">ETA Application Fee</span>
            <span className="font-semibold">$51.00 USD</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b">
            <span className="text-gray-700">Processing Fee</span>
            <span className="font-semibold">$2.00 USD</span>
          </div>
          <div className="flex justify-between items-center py-3 font-bold text-lg">
            <span>Total Amount</span>
            <span className="text-green-600">$53.00 USD</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Select Payment Method</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-16 flex items-center justify-center space-x-3">
              <CreditCard className="w-6 h-6" />
              <span>Credit/Debit Card</span>
            </Button>
            
            <Button variant="outline" className="h-16 flex items-center justify-center space-x-3">
              <Banknote className="w-6 h-6" />
              <span>Bank Transfer</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
