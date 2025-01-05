import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});
const endpointSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') || '';

serve(async (req) => {
  const signature = req.headers.get('stripe-signature');
  
  if (!signature) {
    console.error('No stripe-signature header found');
    return new Response(
      JSON.stringify({ error: 'No stripe-signature header' }), 
      { status: 400 }
    );
  }

  try {
    const body = await req.text();
    console.log('Received webhook. Verifying signature...');
    
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      endpointSecret
    );
    
    console.log('Webhook signature verified. Processing event:', event.type);

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const status = subscription.status;
        const customerId = subscription.customer;
        const plan = subscription.items.data[0].price.id === 'price_1QRmPiL48WAyeSne6JqKIG4T' ? 'monthly' : 'annual';

        console.log('Processing subscription event:', {
          status,
          customerId,
          plan,
          subscriptionId: subscription.id
        });

        // Get customer's email to find the user
        const customer = await stripe.customers.retrieve(customerId as string);
        if (!customer.deleted && customer.email) {
          const { data: users, error: userError } = await supabaseClient
            .from('profiles')
            .update({
              subscription_status: status,
              stripe_customer_id: customerId,
              stripe_subscription_id: subscription.id,
              subscription_plan: plan,
              trial_end_date: subscription.trial_end ? new Date(subscription.trial_end * 1000) : null
            })
            .eq('stripe_customer_id', customerId)
            .select();

          if (userError) {
            console.error('Error updating user:', userError);
            throw userError;
          }
          console.log('Successfully updated user subscription:', users);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const customerId = subscription.customer;

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
          console.error('Error updating user after subscription deletion:', updateError);
          throw updateError;
        }
        console.log('Successfully processed subscription deletion');
        break;
      }

      case 'customer.subscription.trial_will_end': {
        // Handle trial ending notification if needed
        console.log('Trial will end soon for subscription:', event.data.object.id);
        break;
      }

      default: {
        console.log('Unhandled event type:', event.type);
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err) {
    console.error('Error processing webhook:', err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { 
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});