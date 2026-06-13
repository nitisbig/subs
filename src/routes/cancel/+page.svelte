<svelte:head>
	<title>Checkout cancelled</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<main class="wrap">
	<div class="card">
		<div class="mark" aria-hidden="true">↩</div>
		<h1>Checkout cancelled</h1>
		<p class="lead">No charge was made. You can pick a plan whenever you're ready.</p>
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
		--line: #e4e0d6;
		--accent: #1f4a3a;

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
		width: min(28rem, 100%);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: 1.25rem;
		padding: 2.75rem 2.25rem;
		text-align: center;
		box-shadow: 0 24px 60px -40px rgba(26, 24, 20, 0.35);
	}

	.mark {
		width: 3.25rem;
		height: 3.25rem;
		margin: 0 auto 1.5rem;
		display: grid;
		place-items: center;
		font-size: 1.4rem;
		color: var(--muted);
		background: var(--paper);
		border: 1px solid var(--line);
		border-radius: 50%;
	}

	h1 {
		font-family: 'Instrument Serif', serif;
		font-weight: 400;
		font-size: 2rem;
		letter-spacing: -0.01em;
		margin: 0 0 0.5rem;
	}

	.lead {
		color: var(--muted);
		margin: 0 0 1.75rem;
		line-height: 1.5;
	}

	.back {
		display: inline-block;
		color: var(--ink);
		text-decoration: none;
		font-weight: 600;
		border-bottom: 1px solid transparent;
		transition: border-color 0.2s ease;
	}

	.back:hover {
		border-color: var(--accent);
	}
</style>
