
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { reference } = await req.json();

    if (!reference) {
      throw new Error('Payment reference is required');
    }

    const paystackSecretKey = Deno.env.get('PAYSTACK_SECRET_KEY');
    if (!paystackSecretKey) {
      throw new Error('Paystack secret key not configured');
    }

    // Verify payment with Paystack
    const verifyResponse = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${paystackSecretKey}`,
        'Content-Type': 'application/json',
      },
    });

    const verifyData = await verifyResponse.json();

    if (!verifyData.status) {
      throw new Error(verifyData.message || 'Payment verification failed');
    }

    const transaction = verifyData.data;
    const isSuccessful = transaction.status === 'success';

    // Update payment record using service role
    const supabaseService = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    const { error: paymentError } = await supabaseService
      .from('payments')
      .update({
        status: isSuccessful ? 'success' : 'failed',
        payment_method: transaction.channel,
        paystack_response: transaction,
        paid_at: isSuccessful ? new Date().toISOString() : null,
      })
      .eq('paystack_reference', reference);

    if (paymentError) {
      console.error('Failed to update payment:', paymentError);
    }

    // Update application status
    if (isSuccessful) {
      const { error: appError } = await supabaseService
        .from('eta_applications')
        .update({
          payment_status: 'paid',
          paid_at: new Date().toISOString(),
          status: 'Payment Confirmed',
        })
        .eq('payment_reference', reference);

      if (appError) {
        console.error('Failed to update application status:', appError);
      }
    }

    return new Response(JSON.stringify({
      success: true,
      payment_status: transaction.status,
      transaction_data: transaction,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
