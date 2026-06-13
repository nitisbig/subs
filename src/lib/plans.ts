export type PlanMode = 'payment' | 'subscription';

export interface Plan {
	/** internal id, posted from the pricing form */
	id: string;
	name: string;
	/** Stripe Price id (test mode) */
	priceId: string;
	mode: PlanMode;
	/** price in dollars, for display */
	amount: number;
	/** e.g. "one-time" or "/month" */
	cadence: string;
	tagline: string;
	features: string[];
	/** visually highlight this card */
	featured?: boolean;
}

export const plans: Plan[] = [
	{
		id: 'lifetime',
		name: 'Lifetime',
		priceId: 'price_1ThlU82MpHiNAuWG4dmWVGlo',
		mode: 'payment',
		amount: 400,
		cadence: 'one-time',
		tagline: 'Pay once, own it forever.',
		features: ['All current features', 'Lifetime updates', 'No recurring bills', 'Priority email support']
	},
	{
		id: 'pro',
		name: 'Pro',
		priceId: 'price_1ThlUE2MpHiNAuWGKpH7Tw6e',
		mode: 'subscription',
		amount: 10,
		cadence: '/month',
		tagline: 'For individuals getting started.',
		features: ['Core features', 'Up to 5 projects', 'Community support', 'Cancel anytime']
	},
	{
		id: 'max',
		name: 'Max',
		priceId: 'price_1ThlUH2MpHiNAuWGo0rh8tt6',
		mode: 'subscription',
		amount: 40,
		cadence: '/month',
		tagline: 'For growing teams that need more.',
		features: ['Everything in Pro', 'Unlimited projects', 'Advanced analytics', 'Priority support'],
		featured: true
	},
	{
		id: 'ultra',
		name: 'Ultra Max',
		priceId: 'price_1ThlUM2MpHiNAuWGRok33oBl',
		mode: 'subscription',
		amount: 60,
		cadence: '/month',
		tagline: 'Maximum power and limits.',
		features: ['Everything in Max', 'Dedicated support', 'Custom integrations', 'SLA & onboarding']
	}
];

export function getPlan(id: string): Plan | undefined {
	return plans.find((p) => p.id === id);
}
