
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, Banknote, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { supabase } from "@/integrations/supabase/client";

interface PaymentStepProps {
  form: any;
  onChange: (field: string, value: any) => void;
  applicationId?: string;
}

export default function PaymentStep({ form, onChange, applicationId }: PaymentStepProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | null>(null);
  const { toast } = useToast();

  const handlePayment = async (method: 'card' | 'bank') => {
    if (!applicationId) {
      toast({
        title: "Error",
        description: "Application ID is missing. Please try again.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setPaymentMethod(method);

    try {
      // Get current user session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Please log in to continue with payment');
      }

      // Initialize payment with Paystack
      const { data, error } = await supabase.functions.invoke('create-paystack-payment', {
        body: {
          applicationId: applicationId,
          amount: 6800, // KES amount (equivalent to $53 USD)
          currency: 'KES'
        }
      });

      if (error) {
        throw new Error(error.message || 'Failed to initialize payment');
      }

      if (!data.success) {
        throw new Error(data.error || 'Payment initialization failed');
      }

      // Redirect to Paystack checkout
      window.location.href = data.authorization_url;

    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Failed",
        description: error.message || "Unable to process payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
      setPaymentMethod(null);
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-green-900">Payment Information</h3>
        
        <div className="mb-6">
          <div className="flex justify-between items-center py-3 border-b">
            <span className="text-gray-700">ETA Application Fee</span>
            <div className="text-right">
              <div className="font-semibold">{formatCurrency(6500, 'KES')}</div>
              <div className="text-sm text-gray-500">≈ $51.00 USD</div>
            </div>
          </div>
          <div className="flex justify-between items-center py-3 border-b">
            <span className="text-gray-700">Processing Fee</span>
            <div className="text-right">
              <div className="font-semibold">{formatCurrency(300, 'KES')}</div>
              <div className="text-sm text-gray-500">≈ $2.00 USD</div>
            </div>
          </div>
          <div className="flex justify-between items-center py-3 font-bold text-lg">
            <span>Total Amount</span>
            <div className="text-right">
              <div className="text-green-600">{formatCurrency(6800, 'KES')}</div>
              <div className="text-sm text-gray-500 font-normal">≈ $53.00 USD</div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Select Payment Method</h4>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-900">Secure Payment with Paystack</p>
                <p className="text-xs text-blue-700">Your payment is processed securely through Paystack's encrypted payment gateway</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="h-16 flex items-center justify-center space-x-3 relative"
              onClick={() => handlePayment('card')}
              disabled={isProcessing}
            >
              {isProcessing && paymentMethod === 'card' ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <CreditCard className="w-6 h-6" />
              )}
              <div className="text-left">
                <div className="font-medium">Card Payment</div>
                <div className="text-xs text-gray-500">Visa, Mastercard, Verve</div>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-16 flex items-center justify-center space-x-3 relative"
              onClick={() => handlePayment('bank')}
              disabled={isProcessing}
            >
              {isProcessing && paymentMethod === 'bank' ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <Banknote className="w-6 h-6" />
              )}
              <div className="text-left">
                <div className="font-medium">Bank Transfer</div>
                <div className="text-xs text-gray-500">Direct bank payment</div>
              </div>
            </Button>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-900">Payment Methods Available</p>
                <ul className="text-xs text-amber-700 mt-1 space-y-1">
                  <li>• Card payments (Visa, Mastercard, Verve)</li>
                  <li>• Mobile Money (M-Pesa, Airtel Money)</li>
                  <li>• Bank transfers from Kenyan banks</li>
                  <li>• USSD payment options</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
