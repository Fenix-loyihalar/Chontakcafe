<!-- src/routes/+layout.svelte -->
<script>
	import './layout.css';
	import Header from '$lib/components/layout/Header.svelte';
	import TopLoader from '$lib/components/TopLoader.svelte';
	// import Footer from '$lib/components/layout/Footer.svelte';
	const { children } = $props();
</script>

<div class="flex min-h-screen flex-col">
	<TopLoader />
	<Header restaurantName="Choyxona" />

	<main class="flex-1 bg-background">
		{@render children()}
	</main>

	<!-- <Footer /> -->
</div>
