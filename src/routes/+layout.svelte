<!-- src/routes/+layout.svelte -->
<script>
	import "./layout.css"
	import Header from '$lib/components/layout/Header.svelte';
	// import Footer from '$lib/components/layout/Footer.svelte';
	const {children} = $props();
</script>

<div class="min-h-screen flex flex-col">
	<Header restaurantName="Choyxano" />
	
	<main class="flex-1">
		{@render children()}
	</main>
	
	<!-- <Footer /> -->
</div>