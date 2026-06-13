import Stripe from 'stripe';
import { env } from '$env/dynamic/private';

if (!env.STRIPE_SECRET_KEY) {
	// Surfaced at runtime so the prototype fails loudly if the key is missing.
	console.warn('[stripe] STRIPE_SECRET_KEY is not set — add your sk_test_... key to .env');
}

// No apiVersion override — use the version pinned by the installed SDK.
export const stripe = new Stripe(env.STRIPE_SECRET_KEY ?? '');
