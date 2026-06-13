<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { plans } from '$lib/plans';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
	let submitting = $state<string | null>(null);
</script>

<svelte:head>
	<title>Pricing — choose your plan</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Albert+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Instrument+Serif:ital@0;1&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="page">
	<header class="masthead">
		<a class="brand" href="/">
			<span class="brand-mark" aria-hidden="true"></span>
			<span class="brand-name">subs</span>
		</a>
		<span class="badge">
			<span class="dot" aria-hidden="true"></span>
			Stripe · Test mode
		</span>
	</header>

	<section class="intro">
		<div class="intro-lead">
			<span class="eyebrow">Pricing</span>
			<h1>
				Simple pricing,<br />
				<em>no surprises.</em>
			</h1>
		</div>
		<div class="intro-aside">
			<p>
				Own it forever with a single payment, or choose a monthly plan that scales
				alongside your team. Every transaction is processed securely through Stripe.
			</p>
			<ul class="trust">
				<li>Cancel any time</li>
				<li>No hidden fees</li>
				<li>Instant access</li>
			</ul>
		</div>
	</section>

	{#if form?.error}
		<p class="alert" role="alert">{form.error}</p>
	{/if}

	<section class="plans">
		{#each plans as plan, i (plan.id)}
			<article class="card" class:featured={plan.featured} style="--i: {i}">
				{#if plan.featured}<span class="ribbon">Most popular</span>{/if}

				<header class="card-head">
					<span class="num">0{i + 1}</span>
					<h2>{plan.name}</h2>
					<p class="tagline">{plan.tagline}</p>
				</header>

				<div class="price">
					<span class="amount">${plan.amount}</span>
					<span class="cadence">{plan.cadence}</span>
				</div>

				<ul class="features">
					{#each plan.features as feature (feature)}
						<li>{feature}</li>
					{/each}
				</ul>

				<form
					method="POST"
					action="?/checkout"
					use:enhance={() => {
						submitting = plan.id;
						return async ({ result }) => {
							if (result.type === 'redirect') {
								// Stripe Checkout is cross-origin — must do a full navigation.
								window.location.href = result.location;
								return;
							}
							await applyAction(result);
							submitting = null;
						};
					}}
				>
					<input type="hidden" name="planId" value={plan.id} />
					<button type="submit" disabled={submitting !== null}>
						{#if submitting === plan.id}
							Redirecting…
						{:else if plan.mode === 'payment'}
							Buy lifetime
						{:else}
							Choose {plan.name}
						{/if}
						<span class="arrow" aria-hidden="true">→</span>
					</button>
				</form>
			</article>
		{/each}
	</section>

	<footer class="foot">
		<p>
			Test card <code>4242 4242 4242 4242</code>
			<span class="sep">·</span> any future expiry
			<span class="sep">·</span> any CVC &amp; ZIP
		</p>
	</footer>
</div>

<style>
	:global(html) {
		background: #f4f2ec;
	}

	.page {
		--paper: #f4f2ec;
		--surface: #ffffff;
		--ink: #1a1814;
		--muted: #6e685c;
		--faint: #9a9488;
		--line: #e4e0d6;
		--accent: #1f4a3a;
		--accent-ink: #163a2c;
		--accent-tint: #ebf1ed;

		position: relative;
		min-height: 100vh;
		max-width: 72rem;
		margin: 0 auto;
		padding: clamp(1.75rem, 4vw, 2.75rem) clamp(1.25rem, 5vw, 3.5rem) 4rem;
		background: var(--paper);
		color: var(--ink);
		font-family: 'Albert Sans', sans-serif;
		font-weight: 400;
		-webkit-font-smoothing: antialiased;
	}

	/* ---------- Masthead ---------- */
	.masthead {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: clamp(2.5rem, 6vw, 4.5rem);
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		text-decoration: none;
		color: var(--ink);
	}

	.brand-mark {
		width: 1.15rem;
		height: 1.15rem;
		border-radius: 0.3rem;
		background: var(--accent);
		box-shadow: inset 0 0 0 2px var(--paper), 0 0 0 1px var(--accent);
	}

	.brand-name {
		font-family: 'Instrument Serif', serif;
		font-size: 1.35rem;
		letter-spacing: 0.01em;
	}

	.badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.74rem;
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--muted);
		padding: 0.4rem 0.8rem;
		border: 1px solid var(--line);
		border-radius: 100px;
		background: var(--surface);
	}

	.badge .dot {
		width: 0.45rem;
		height: 0.45rem;
		border-radius: 50%;
		background: var(--accent);
		box-shadow: 0 0 0 3px var(--accent-tint);
	}

	/* ---------- Intro (asymmetric split) ---------- */
	.intro {
		display: grid;
		grid-template-columns: 1.3fr 1fr;
		gap: clamp(1.5rem, 5vw, 4rem);
		align-items: end;
		padding-bottom: clamp(2.25rem, 5vw, 3.5rem);
		border-bottom: 1px solid var(--line);
		animation: rise 0.7s ease both;
	}

	.eyebrow {
		display: inline-block;
		font-size: 0.78rem;
		font-weight: 600;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--accent);
		margin-bottom: 1.1rem;
	}

	h1 {
		font-family: 'Instrument Serif', serif;
		font-weight: 400;
		font-size: clamp(2.8rem, 7vw, 5rem);
		line-height: 0.96;
		letter-spacing: -0.015em;
		margin: 0;
	}

	h1 em {
		font-style: italic;
		color: var(--accent);
	}

	.intro-aside p {
		font-size: clamp(0.98rem, 1.4vw, 1.08rem);
		line-height: 1.65;
		color: var(--muted);
		margin: 0 0 1.4rem;
	}

	.trust {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1.4rem;
		margin: 0;
		padding: 0;
	}

	.trust li {
		position: relative;
		padding-left: 1.1rem;
		font-size: 0.86rem;
		font-weight: 500;
		color: var(--ink);
	}

	.trust li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.52em;
		width: 0.4rem;
		height: 0.4rem;
		border-radius: 50%;
		background: var(--accent);
	}

	/* ---------- Alert ---------- */
	.alert {
		margin: 1.5rem 0 0;
		padding: 0.85rem 1.1rem;
		border: 1px solid #e2b4a8;
		background: #fbeae5;
		color: #8a3320;
		border-radius: 0.6rem;
		font-size: 0.92rem;
	}

	/* ---------- Pricing cards ---------- */
	.plans {
		margin-top: 0.5rem;
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: clamp(0.85rem, 1.5vw, 1.15rem);
		align-items: stretch;
	}

	.card {
		position: relative;
		display: flex;
		flex-direction: column;
		padding: clamp(1.4rem, 2vw, 1.75rem) clamp(1.3rem, 1.8vw, 1.6rem);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: 1.1rem;
		box-shadow: 0 1px 2px rgba(26, 24, 20, 0.03);
		transition:
			transform 0.25s ease,
			box-shadow 0.25s ease,
			border-color 0.25s ease;
		animation: rise 0.6s ease both;
		animation-delay: calc(var(--i) * 70ms + 120ms);
	}

	.card:hover {
		transform: translateY(-4px);
		border-color: #d3cdbf;
		box-shadow: 0 16px 36px -20px rgba(26, 24, 20, 0.28);
	}

	/* Featured tier — lifted, accent-tinted, ringed */
	.card.featured {
		background: var(--accent-tint);
		border-color: transparent;
		box-shadow:
			0 0 0 1.5px var(--accent),
			0 18px 40px -22px rgba(22, 58, 44, 0.55);
		transform: translateY(-0.65rem);
	}

	.card.featured:hover {
		transform: translateY(-0.95rem);
		box-shadow:
			0 0 0 1.5px var(--accent),
			0 26px 52px -24px rgba(22, 58, 44, 0.55);
	}

	.ribbon {
		position: absolute;
		top: 0;
		right: clamp(1.3rem, 1.8vw, 1.6rem);
		transform: translateY(-50%);
		font-size: 0.62rem;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--surface);
		background: var(--accent);
		padding: 0.3rem 0.65rem;
		border-radius: 100px;
		white-space: nowrap;
		box-shadow: 0 4px 12px -4px rgba(22, 58, 44, 0.5);
	}

	/* identity */
	.card-head {
		position: relative;
		padding-bottom: 1.15rem;
		margin-bottom: 1.15rem;
		border-bottom: 1px solid var(--line);
	}

	.featured .card-head {
		border-bottom-color: rgba(31, 74, 58, 0.18);
	}

	.num {
		font-family: 'Instrument Serif', serif;
		font-style: italic;
		font-size: 1rem;
		color: var(--faint);
	}

	.card-head h2 {
		font-family: 'Instrument Serif', serif;
		font-weight: 400;
		font-size: 1.85rem;
		line-height: 1.05;
		letter-spacing: -0.01em;
		margin: 0.15rem 0 0.45rem;
	}

	.tagline {
		font-size: 0.86rem;
		line-height: 1.45;
		color: var(--muted);
		margin: 0;
	}

	/* price */
	.price {
		display: flex;
		align-items: baseline;
		gap: 0.3rem;
		margin-bottom: 1.25rem;
	}

	.amount {
		font-size: 2.6rem;
		font-weight: 600;
		letter-spacing: -0.035em;
		font-feature-settings: 'tnum' 1;
		line-height: 1;
	}

	.cadence {
		font-size: 0.85rem;
		font-weight: 500;
		color: var(--faint);
	}

	/* features */
	.features {
		list-style: none;
		margin: 0 0 1.5rem;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.features li {
		position: relative;
		padding-left: 1.4rem;
		font-size: 0.85rem;
		line-height: 1.35;
		color: var(--ink);
	}

	.features li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.18em;
		width: 0.85rem;
		height: 0.85rem;
		border-radius: 50%;
		background: var(--accent-tint);
		box-shadow: inset 0 0 0 1px rgba(31, 74, 58, 0.35);
	}

	.features li::after {
		content: '';
		position: absolute;
		left: 0.27rem;
		top: 0.42em;
		width: 0.3rem;
		height: 0.16rem;
		border-left: 1.5px solid var(--accent);
		border-bottom: 1.5px solid var(--accent);
		transform: rotate(-45deg);
	}

	.featured .features li::before {
		background: var(--surface);
	}

	/* buy */
	form {
		margin-top: auto;
		width: 100%;
	}

	button {
		width: 100%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
		padding: 0.8rem 1.2rem;
		font-family: inherit;
		font-size: 0.92rem;
		font-weight: 600;
		color: var(--ink);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: 0.65rem;
		cursor: pointer;
		transition:
			background 0.2s ease,
			color 0.2s ease,
			border-color 0.2s ease,
			transform 0.12s ease;
	}

	button .arrow {
		transition: transform 0.2s ease;
	}

	button:hover {
		border-color: var(--ink);
		transform: translateY(-1px);
	}

	button:hover .arrow {
		transform: translateX(3px);
	}

	button:active {
		transform: translateY(0) scale(0.99);
	}

	.featured button {
		background: var(--accent);
		color: var(--surface);
		border-color: var(--accent);
	}

	.featured button:hover {
		background: var(--accent-ink);
		border-color: var(--accent-ink);
	}

	button:disabled {
		opacity: 0.5;
		cursor: progress;
		transform: none;
	}

	/* ---------- Footer ---------- */
	.foot {
		margin-top: 3rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--line);
		text-align: center;
		color: var(--muted);
		font-size: 0.82rem;
	}

	.foot .sep {
		color: var(--faint);
		margin: 0 0.3rem;
	}

	.foot code {
		font-family: 'Albert Sans', monospace;
		font-weight: 600;
		letter-spacing: 0.02em;
		color: var(--accent);
		background: var(--accent-tint);
		padding: 0.15rem 0.45rem;
		border-radius: 0.35rem;
	}

	/* ---------- Responsive ---------- */
	@media (max-width: 960px) {
		.intro {
			grid-template-columns: 1fr;
			align-items: start;
			gap: 1.75rem;
		}

		.plans {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 1rem;
		}

		/* keep the featured lift from overlapping its grid row neighbour */
		.card.featured {
			transform: none;
		}

		.card.featured:hover {
			transform: translateY(-4px);
		}
	}

	@media (max-width: 540px) {
		.plans {
			grid-template-columns: 1fr;
		}
	}

	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(14px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.intro,
		.card {
			animation: none;
		}
		button,
		.card,
		.arrow {
			transition: none;
		}
	}
</style>
