<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="apple-touch-icon" href={favicon} />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="description" content="Modern weather app built with SvelteKit" />
	<meta name="theme-color" content="#667eea" />
</svelte:head>

<style>
	:global(html, body) {
		margin: 0;
		padding: 0;
		width: 100%;
		overflow-x: hidden;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		box-sizing: border-box;
	}

	:global(*) {
		box-sizing: inherit;
	}
</style>

{@render children()}
