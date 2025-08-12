
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
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;

    if (!user?.email) {
      throw new Error('User not authenticated');
    }

    const { applicationId, amount, currency = 'KES' } = await req.json();

    if (!applicationId || !amount) {
      throw new Error('Missing required fields: applicationId, amount');
    }

    const paystackSecretKey = Deno.env.get('PAYSTACK_SECRET_KEY');
    if (!paystackSecretKey) {
      throw new Error('Paystack secret key not configured');
    }

    // Generate unique reference
    const reference = `eta_${applicationId}_${Date.now()}`;

    // Initialize payment with Paystack
    const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${paystackSecretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        amount: Math.round(amount * 100), // Convert to kobo (smallest unit)
        currency: currency,
        reference: reference,
        callback_url: `${req.headers.get('origin')}/payment-success`,
        metadata: {
          applicationId: applicationId,
          userId: user.id,
        },
        channels: ['card', 'bank', 'mobile_money', 'bank_transfer'],
      }),
    });

    const paystackData = await paystackResponse.json();

    if (!paystackData.status) {
      throw new Error(paystackData.message || 'Failed to initialize payment');
    }

    // Create payment record using service role to bypass RLS
    const supabaseService = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    const { error: paymentError } = await supabaseService
      .from('payments')
      .insert({
        application_id: applicationId,
        user_id: user.id,
        paystack_reference: reference,
        paystack_access_code: paystackData.data.access_code,
        amount_usd: currency === 'USD' ? amount : (amount / 128), // Rough conversion
        amount_kes: currency === 'KES' ? amount : (amount * 128),
        currency: currency,
        status: 'pending',
        paystack_response: paystackData.data,
      });

    if (paymentError) {
      console.error('Failed to create payment record:', paymentError);
      throw new Error('Failed to create payment record');
    }

    // Update application with payment reference
    const { error: appError } = await supabaseService
      .from('eta_applications')
      .update({
        payment_reference: reference,
        payment_status: 'pending',
      })
      .eq('id', applicationId);

    if (appError) {
      console.error('Failed to update application:', appError);
    }

    return new Response(JSON.stringify({
      success: true,
      authorization_url: paystackData.data.authorization_url,
      access_code: paystackData.data.access_code,
      reference: reference,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Payment initialization error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
