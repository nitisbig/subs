import { fail, redirect } from '@sveltejs/kit';
import { stripe } from '$lib/server/stripe';
import { getPlan } from '$lib/plans';
import type { Actions } from './$types';

export const actions: Actions = {
	checkout: async ({ request, url }) => {
		const data = await request.formData();
		const planId = String(data.get('planId') ?? '');
		const plan = getPlan(planId);

		if (!plan) {
			return fail(400, { error: 'Unknown plan.' });
		}

		let checkoutUrl: string | null = null;
		try {
			const session = await stripe.checkout.sessions.create({
				mode: plan.mode,
				line_items: [{ price: plan.priceId, quantity: 1 }],
				success_url: `${url.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
				cancel_url: `${url.origin}/cancel`
			});
			checkoutUrl = session.url;
		} catch (err) {
			const message = err instanceof Error ? err.message : 'Could not start checkout.';
			return fail(500, { error: message });
		}

		if (!checkoutUrl) {
			return fail(500, { error: 'Stripe did not return a checkout URL.' });
		}

		// Redirect must be thrown outside the try/catch (it works by throwing).
		throw redirect(303, checkoutUrl);
	}
};
