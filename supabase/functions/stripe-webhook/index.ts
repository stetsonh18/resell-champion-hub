import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});
const endpointSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') || '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialize Supabase client
const initSupabaseClient = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  );
};

// Verify Stripe webhook signature
const verifyStripeWebhook = async (req: Request, signature: string) => {
  try {
    const body = await req.text();
    const event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      endpointSecret
    );
    console.log('Webhook signature verified. Processing event:', event.type);
    return { event, error: null };
  } catch (err) {
    console.error('Error verifying webhook signature:', err);
    return { event: null, error: err };
  }
};

// Update profile subscription details
const updateProfileSubscription = async (
  supabaseClient: any,
  customerId: string,
  subscriptionData: {
    status: string;
    id: string;
    plan: string;
    trial_end?: number | null;
  }
) => {
  const updateData = {
    subscription_status: subscriptionData.status,
    stripe_customer_id: customerId,
    stripe_subscription_id: subscriptionData.id,
    subscription_plan: subscriptionData.plan,
    trial_end_date: subscriptionData.trial_end 
      ? new Date(subscriptionData.trial_end * 1000) 
      : null
  };

  // First try updating by customer ID
  const { data: profiles, error: profileError } = await supabaseClient
    .from('profiles')
    .update(updateData)
    .eq('stripe_customer_id', customerId)
    .select();

  if (profileError) {
    console.error('Error updating profile:', profileError);
    throw profileError;
  }

  return profiles;
};

// Find and update profile by email
const updateProfileByEmail = async (
  supabaseClient: any,
  customerEmail: string,
  updateData: any
) => {
  const { data: users } = await supabaseClient.auth.admin.listUsers();
  const userId = users.users.find(u => u.email === customerEmail)?.id;

  if (!userId) {
    console.error('No user found with email:', customerEmail);
    return null;
  }

  const { data: profiles, error } = await supabaseClient
    .from('profiles')
    .update(updateData)
    .eq('id', userId)
    .select();

  if (error) {
    console.error('Error updating profile by email:', error);
    throw error;
  }

  return profiles;
};

// Handle subscription events
const handleSubscriptionEvent = async (
  supabaseClient: any,
  event: Stripe.Event
) => {
  const subscription = event.data.object as Stripe.Subscription;
  const status = subscription.status;
  const customerId = subscription.customer as string;
  const plan = subscription.items.data[0].price.id === 'price_1QdMXRL48WAyeSnenuhkAjBe' 
    ? 'monthly' 
    : 'annual';

  console.log('Processing subscription event:', {
    status,
    customerId,
    plan,
    subscriptionId: subscription.id,
    priceId: subscription.items.data[0].price.id
  });

  const customer = await stripe.customers.retrieve(customerId);
  if (customer.deleted || !customer.email) {
    console.error('Invalid customer:', customer);
    return;
  }

  // Try updating by customer ID first
  const profiles = await updateProfileSubscription(supabaseClient, customerId, {
    status,
    id: subscription.id,
    plan,
    trial_end: subscription.trial_end
  });

  // If no profiles were updated, try by email
  if (!profiles || profiles.length === 0) {
    console.log('No profile found by customer ID, searching by email...');
    await updateProfileByEmail(
      supabaseClient,
      customer.email,
      {
        subscription_status: status,
        stripe_customer_id: customerId,
        stripe_subscription_id: subscription.id,
        subscription_plan: plan,
        trial_end_date: subscription.trial_end 
          ? new Date(subscription.trial_end * 1000) 
          : null
      }
    );
  }
};

// Handle subscription deletion
const handleSubscriptionDeletion = async (
  supabaseClient: any,
  subscription: Stripe.Subscription
) => {
  const customerId = subscription.customer as string;
  console.log('Processing subscription deletion:', { customerId });

  const { error: updateError } = await supabaseClient
    .from('profiles')
    .update({
      subscription_status: 'canceled',
      subscription_plan: null,
      trial_end_date: null
    })
    .eq('stripe_customer_id', customerId);

  if (updateError) {
    console.error('Error updating profile after subscription deletion:', updateError);
    throw updateError;
  }
  console.log('Successfully processed subscription deletion');
};

// Main webhook handler
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const signature = req.headers.get('stripe-signature');
    if (!signature) {
      console.error('No stripe-signature header found');
      return new Response(
        JSON.stringify({ error: 'No stripe-signature header' }), 
        { status: 400, headers: corsHeaders }
      );
    }

    const { event, error } = await verifyStripeWebhook(req, signature);
    if (error || !event) {
      return new Response(
        JSON.stringify({ error: 'Invalid signature' }), 
        { status: 400, headers: corsHeaders }
      );
    }

    const supabaseClient = initSupabaseClient();

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionEvent(supabaseClient, event);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeletion(supabaseClient, event.data.object as Stripe.Subscription);
        break;

      default:
        console.log('Unhandled event type:', event.type);
    }

    return new Response(
      JSON.stringify({ received: true }), 
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Error processing webhook:', err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});