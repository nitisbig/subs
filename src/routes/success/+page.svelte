<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function money(amount: number | null | undefined, currency: string | null | undefined) {
		if (amount == null) return '';
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: (currency ?? 'usd').toUpperCase()
		}).format(amount / 100);
	}
</script>

<svelte:head>
	<title>Payment successful</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<main class="wrap">
	<div class="card">
		{#if data.status === 'ok'}
			<div class="mark" aria-hidden="true">✓</div>
			<h1>You're all set.</h1>
			<p class="lead">
				{#if data.mode === 'subscription'}
					Your subscription is active.
				{:else}
					Your payment went through.
				{/if}
			</p>

			<dl class="receipt">
				{#if data.description}
					<div><dt>Plan</dt><dd>{data.description}</dd></div>
				{/if}
				<div>
					<dt>Amount</dt>
					<dd class="amt">{money(data.amountTotal, data.currency)}{data.mode === 'subscription' ? ' / mo' : ''}</dd>
				</div>
				{#if data.email}
					<div><dt>Receipt to</dt><dd>{data.email}</dd></div>
				{/if}
				<div><dt>Status</dt><dd class="ok">{data.paymentStatus}</dd></div>
			</dl>
		{:else if data.status === 'missing'}
			<h1>No session found</h1>
			<p class="lead">This page is shown after a Stripe checkout completes.</p>
		{:else}
			<h1>Hmm.</h1>
			<p class="lead">We couldn't load your session: {data.error}</p>
		{/if}

		<a class="back" href="/">← Back to pricing</a>
	</div>
</main>

<style>
	:global(html) {
		background: #f4f2ec;
	}

	.wrap {
		--paper: #f4f2ec;
		--surface: #ffffff;
		--ink: #1a1814;
		--muted: #6e685c;
		--faint: #9a9488;
		--line: #e4e0d6;
		--accent: #1f4a3a;
		--accent-tint: #ebf1ed;

		min-height: 100vh;
		display: grid;
		place-items: center;
		padding: 2rem;
		background: var(--paper);
		color: var(--ink);
		font-family: 'Albert Sans', sans-serif;
		-webkit-font-smoothing: antialiased;
	}

	.card {
		width: min(30rem, 100%);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: 1.25rem;
		padding: 2.75rem 2.25rem;
		text-align: center;
		box-shadow: 0 24px 60px -40px rgba(26, 24, 20, 0.4);
	}

	.mark {
		width: 3.25rem;
		height: 3.25rem;
		margin: 0 auto 1.5rem;
		display: grid;
		place-items: center;
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--surface);
		background: var(--accent);
		border-radius: 50%;
		box-shadow: 0 0 0 6px var(--accent-tint);
	}

	h1 {
		font-family: 'Instrument Serif', serif;
		font-weight: 400;
		font-size: 2.2rem;
		letter-spacing: -0.01em;
		margin: 0 0 0.5rem;
	}

	.lead {
		color: var(--muted);
		margin: 0 0 1.75rem;
		line-height: 1.5;
	}

	.receipt {
		text-align: left;
		border-top: 1px solid var(--line);
		margin: 0 0 1.75rem;
	}

	.receipt div {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.8rem 0;
		border-bottom: 1px solid var(--line);
	}

	dt {
		color: var(--muted);
		font-size: 0.9rem;
	}

	dd {
		margin: 0;
		font-weight: 600;
		text-align: right;
	}

	dd.amt {
		font-feature-settings: 'tnum' 1;
		color: var(--accent);
	}

	dd.ok {
		color: var(--accent);
		text-transform: capitalize;
	}

	.back {
		display: inline-block;
		color: var(--ink);
		text-decoration: none;
		font-weight: 600;
		font-size: 0.95rem;
		border-bottom: 1px solid transparent;
		transition: border-color 0.2s ease;
	}

	.back:hover {
		border-color: var(--accent);
	}
</style>
