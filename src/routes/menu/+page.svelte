<script>
	import MenuItemCard from '$lib/components/cart/MenuItemCard.svelte';
	import CartBar from '$lib/components/cart/CartBar.svelte';
	import AIAssistant from '$lib/components/cart/AIAssistant.svelte';
	import { Bot } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { page } from '$app/state';
	import { addNewOrder } from '$lib/stores/order.svelte.js'; 
	import { menuItems as rawMenuItems } from '$lib/stores/menu.svelte.js';
	import { t, lang } from "$lib/i18n.js";

	let menuItems = $derived(rawMenuItems.map(item => ({
		...item,
		name: (typeof item.name === 'object' && item.name !== null) ? (item.name[$lang] || item.name.uz) : item.name,
		description: (typeof item.description === 'object' && item.description !== null) ? (item.description[$lang] || item.description.uz) : item.description,
	})));

	/**
	 * @type {any[] | null | undefined}
	 */
	let categories = $derived([
		{ id: 'food', label: $t('menu.categories.food') },
		{ id: 'drinks', label: $t('menu.categories.drinks') },
		{ id: 'desserts', label: $t('menu.categories.desserts') }
	]);

	/**
	 * @type {any[]}
	 */
	let cart = $state([]);
	let activeCategory = $state('food');
	let tableNumber = $derived(page.url.searchParams.get('table') || 'N/A');
	let isAIAssistantOpen = $state(false);

	let filteredItems = $derived(menuItems.filter((item) => item.category === activeCategory));
	let itemCount = $derived(cart.reduce((sum, item) => sum + item.quantity, 0));
	let totalPrice = $derived(cart.reduce((sum, item) => sum + item.price * item.quantity, 0));

	function handlePlaceOrder() {
		if (cart.length === 0) return;

		const orderData = {
			tableNumber: Number(tableNumber),
			items: cart.map((item) => ({
				itemId: item.id,
				quantity: item.quantity
			})),
			totalPrice: totalPrice
		};

		addNewOrder(orderData); 

		alert(`${tableNumber} ${$t('menu.alert_order')}`);
		cart = [];
	}

	/**
	 * @param {any} itemId
	 */
	function addToCart(itemId) {
		const item = rawMenuItems.find((i) => i.id === itemId);
		if (!item) return;

		const existing = cart.find((i) => i.id === itemId);
		if (existing) existing.quantity += 1;
		else cart.push({ ...item, quantity: 1 });
	}

	/** @param {any[]} items */
	function addMultipleToCart(items) {
		items.forEach(item => addToCart(item.id));
	}

</script>

<div class="min-h-screen bg-background pb-32 transition-colors duration-500">
	<main class="container mx-auto max-w-7xl px-4 py-10">
		<div class="mb-10">
			<h2 class="mb-3 text-4xl font-extrabold tracking-tighter">{$t('menu.title')}</h2>
			<p class="max-w-lg text-lg text-muted-foreground">
				{$t('menu.subtitle')}
			</p>
		</div>

		<div class="mb-10 flex w-fit gap-2 rounded-2xl border border-border/50 bg-muted/50 p-1.5">
			{#each categories as { id, label }}
				<button
					onclick={() => (activeCategory = id)}
					class="rounded-xl px-8 py-2.5 text-sm font-bold transition-all duration-300
            {activeCategory === id
						? 'scale-100 bg-background text-primary shadow-sm'
						: 'scale-95 text-muted-foreground opacity-70 hover:text-foreground'}"
				>
					{label}
				</button>
			{/each}
		</div>

		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each filteredItems as item (item.id)}
				<div in:fade={{ duration: 200 }}>
					<MenuItemCard {...item} onAdd={addToCart} />
				</div>
			{/each}
		</div>
	</main>

	<CartBar {itemCount} {totalPrice} onPlaceOrder={handlePlaceOrder} />

	<!-- AI Assistant FAB -->
	<button
		onclick={() => (isAIAssistantOpen = true)}
		class="fixed bottom-24 right-4 z-40 bg-primary/90 hover:bg-primary text-primary-foreground p-4 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center justify-center {isAIAssistantOpen ? 'hidden' : ''}"
		aria-label={$t('ui.open_ai')}
	>
		<Bot class="w-6 h-6 animate-pulse" />
	</button>

	<!-- AI Assistant Component -->
	<AIAssistant bind:isOpen={isAIAssistantOpen} {menuItems} onAddCombo={addMultipleToCart} />
</div>

<style>
	/* Custom smooth scroll and text selection */
	:global(html) {
		scroll-behavior: smooth;
	}

	:global(::selection) {
		background: hsl(var(--primary) / 0.2);
		color: hsl(var(--primary));
	}
</style>
