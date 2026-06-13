# Subscription Plans — SvelteKit 5 + Stripe (prototype)

A pricing page with four plans, each routed through **Stripe Checkout** in **sandbox/test mode**:

| Plan      | Price     | Stripe mode    |
| --------- | --------- | -------------- |
| Lifetime  | $400 once | `payment`      |
| Pro       | $10 / mo  | `subscription` |
| Max       | $40 / mo  | `subscription` |
| Ultra Max | $60 / mo  | `subscription` |

Click a plan → server creates a Checkout Session → redirect to Stripe's hosted page →
back to `/success` (or `/cancel`). No webhooks; the success page confirms by retrieving the session.

## 1. Add your Stripe test key (required)

Open `.env` and replace the placeholder with your **test secret key** from the
[sandbox API keys page](https://dashboard.stripe.com/acct_1SJZJi2MpHiNAuWG/apikeys):

```
STRIPE_SECRET_KEY=sk_test_...your real test key...
```

## 2. Run

```sh
npm run dev -- --open
```

## 3. Test the flow

1. Pick a plan on the pricing page.
2. On Stripe Checkout, pay with test card **`4242 4242 4242 4242`**, any future expiry, any CVC and ZIP.
3. You land on `/success` with the plan and amount. Cancelling lands on `/cancel`.

## Where things live

- `src/lib/plans.ts` — plan metadata + Stripe Price IDs (already created in the sandbox).
- `src/lib/server/stripe.ts` — server-side Stripe client (reads `STRIPE_SECRET_KEY`).
- `src/routes/+page.svelte` / `+page.server.ts` — pricing grid + `checkout` form action.
- `src/routes/success/`, `src/routes/cancel/` — post-checkout pages.

> Prototype scope: no auth, no database, no webhooks, test mode only.
