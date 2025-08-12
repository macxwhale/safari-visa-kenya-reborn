
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/useToast";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [verificationStatus, setVerificationStatus] = useState<'verifying' | 'success' | 'failed'>('verifying');
  const [paymentDetails, setPaymentDetails] = useState<any>(null);

  const reference = searchParams.get('reference');
  const trxref = searchParams.get('trxref');

  useEffect(() => {
    const verifyPayment = async () => {
      const paymentRef = reference || trxref;
      
      if (!paymentRef) {
        setVerificationStatus('failed');
        toast({
          title: "Verification Failed",
          description: "Payment reference not found",
          variant: "destructive"
        });
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke('verify-paystack-payment', {
          body: { reference: paymentRef }
        });

        if (error || !data.success) {
          throw new Error(data?.error || 'Verification failed');
        }

        if (data.payment_status === 'success') {
          setVerificationStatus('success');
          setPaymentDetails(data.transaction_data);
          toast({
            title: "Payment Verified",
            description: "Your payment has been successfully verified!",
          });
        } else {
          setVerificationStatus('failed');
          toast({
            title: "Payment Failed",
            description: "Payment verification failed. Please contact support.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error('Verification error:', error);
        setVerificationStatus('failed');
        toast({
          title: "Verification Error",
          description: error.message || "Unable to verify payment",
          variant: "destructive"
        });
      }
    };

    verifyPayment();
  }, [reference, trxref, toast]);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount / 100); // Convert from kobo to naira
  };

  if (verificationStatus === 'verifying') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
            <CardTitle>Verifying Payment</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600">Please wait while we verify your payment...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (verificationStatus === 'failed') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-600" />
            <CardTitle className="text-red-900">Payment Verification Failed</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              We couldn't verify your payment. If you were charged, please contact our support team.
            </p>
            <div className="space-y-2">
              <Button onClick={() => navigate('/apply')} className="w-full">
                Try Again
              </Button>
              <Button variant="outline" onClick={() => navigate('/')} className="w-full">
                Go Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-600" />
          <CardTitle className="text-green-900">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Your Kenya ETA application payment has been processed successfully.
            </p>
          </div>

          {paymentDetails && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="font-semibold">{formatAmount(paymentDetails.amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-mono text-sm">{paymentDetails.reference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="capitalize">{paymentDetails.channel}</span>
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">What's Next?</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Your application is now under review</li>
              <li>• You'll receive email updates on the status</li>
              <li>• Processing typically takes 2-3 business days</li>
              <li>• Check your application status anytime</li>
            </ul>
          </div>

          <div className="space-y-2">
            <Button onClick={() => navigate('/dashboard')} className="w-full">
              View Application Status
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" onClick={() => navigate('/')} className="w-full">
              Return Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
