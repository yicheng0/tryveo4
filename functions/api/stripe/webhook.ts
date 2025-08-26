/**
 * Cloudflare Pages Function for Stripe webhook handling
 * Converts Next.js API route to Cloudflare Workers format
 */

import { apiResponse } from '@/lib/api-response';
import { getErrorMessage } from '@/lib/error-utils';
import stripe from '@/lib/stripe/stripe';
import { handleCheckoutSessionCompleted, handleInvoicePaid, handleInvoicePaymentFailed, handleRefund, handleSubscriptionUpdate } from '@/lib/stripe/webhook-handlers';
import Stripe from 'stripe';

const relevantEvents = new Set([
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'invoice.paid',
  'invoice.payment_failed',
  'charge.refunded'
]);

export async function onRequestPost(context: { request: Request; env: any }) {
  const { request, env } = context;

  // Set environment variables from Cloudflare
  if (env) {
    Object.entries(env).forEach(([key, value]) => {
      if (typeof value === 'string') {
        process.env[key] = value;
      }
    });
  }

  const body = await request.text();
  const sig = request.headers.get('stripe-signature') as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    console.error('Error: Missing stripe-signature or webhook secret.');
    return apiResponse.badRequest('Webhook secret not configured');
  }

  if (!stripe) {
    return apiResponse.serverError('Stripe is not initialized. Please check your environment variables.');
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error(`Error constructing webhook event: ${err.message}`);
    return apiResponse.badRequest(`Webhook Error: ${err.message}`);
  }

  if (relevantEvents.has(event.type)) {
    try {
      // Process webhook synchronously in Cloudflare Workers
      await processWebhookEvent(event);
      return apiResponse.success({ received: true });
    } catch (error) {
      console.error(`Error processing webhook ${event.type}:`, error);
      const errorMessage = getErrorMessage(error);
      return apiResponse.serverError(`Webhook handler failed. Error: ${errorMessage}`);
    }
  } else {
    return apiResponse.success({ received: true });
  }
}

async function processWebhookEvent(event: Stripe.Event) {
  // console.log('debug event', event.type, JSON.stringify(event.data.object));

  switch (event.type) {
    case 'checkout.session.completed':
      if (event.data.object.mode === 'payment') {
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
      }
      break;
    case 'invoice.paid':
      await handleInvoicePaid(event.data.object as Stripe.Invoice);
      break;
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      await handleSubscriptionUpdate(event.data.object as Stripe.Subscription);
      break;
    case 'customer.subscription.deleted':
      await handleSubscriptionUpdate(event.data.object as Stripe.Subscription, true);
      break;
    case 'invoice.payment_failed':
      await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
      break;
    case 'charge.refunded':
      await handleRefund(event.data.object as Stripe.Charge);
      break;
    default:
      console.warn(`Unhandled relevant event type: ${event.type}`);
  }
}