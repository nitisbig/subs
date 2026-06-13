import { stripe } from '$lib/server/stripe';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const sessionId = url.searchParams.get('session_id');
	if (!sessionId) {
		return { status: 'missing' as const };
	}

	try {
		const session = await stripe.checkout.sessions.retrieve(sessionId, {
			expand: ['line_items']
		});
		const item = session.line_items?.data[0];
		return {
			status: 'ok' as const,
			mode: session.mode,
			paymentStatus: session.payment_status,
			email: session.customer_details?.email ?? null,
			amountTotal: session.amount_total,
			currency: session.currency,
			description: item?.description ?? null
		};
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Could not retrieve session.';
		return { status: 'error' as const, error: message };
	}
};
