<script>
	import { ClipboardList, Filter } from 'lucide-svelte';
	import WaiterOrderCard from '$lib/components/cart/WaiterOrderCard.svelte';
	import { fade, fly } from 'svelte/transition';
	import { t } from '$lib/i18n.js';

	// REAL STORE NI IMPORT QILAMIZ
	import { orders, updateOrderStatus, markAsServed } from '$lib/stores/order.svelte';

	let activeFilter = $state('all');

	const filteredOrders = $derived(
		activeFilter === 'all' ? orders : orders.filter((o) => o.status === activeFilter)
	);

	const stats = $derived({
		all: orders.length,
		pending: orders.filter((o) => o.status === 'pending').length,
		in_progress: orders.filter((o) => o.status === 'in_progress').length,
		ready: orders.filter((o) => o.status === 'ready').length
	});

	/**
	 * Oshpaz qiladigan ishni ofitsiant ham qila olishi uchun (ixtiyoriy)
	 */
	function handleStatusChange(orderId, newStatus) {
		updateOrderStatus(orderId, newStatus);
	}

	/**
	 * Ofitsiant stolga olib borganda chaqiriladi
	 */
	function handleServed(orderId) {
		markAsServed(orderId);
	}
</script>

<main class="container mx-auto max-w-7xl px-4 py-8">
	<div class="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
		<div>
			<div class="mb-2 flex items-center gap-2 text-primary">
				<div class="h-2 w-2 animate-ping rounded-full bg-green-500"></div>
				<span class="text-xs font-bold tracking-widest uppercase"
					>{$t('waiter.live_updates') || 'LIVE FEED'}</span
				>
			</div>
			<h2 class="text-4xl font-black tracking-tighter uppercase">
				{$t('waiter.title') || 'Orders Panel'}
			</h2>
		</div>

		<div
			class="flex flex-wrap gap-2 rounded-2xl border border-border/50 bg-muted/50 p-1.5 backdrop-blur-sm"
		>
			{#each ['all', 'pending', 'in_progress', 'ready'] as filter}
				<button
					onclick={() => (activeFilter = filter)}
					class="rounded-xl px-5 py-2.5 text-xs font-black transition-all duration-300
          {activeFilter === filter
						? 'scale-100 bg-background text-primary shadow-md'
						: 'scale-95 text-muted-foreground opacity-70 hover:text-foreground'}"
				>
					{$t('status.' + filter).toUpperCase()}
					<span class="ml-1 opacity-50">({stats[filter]})</span>
				</button>
			{/each}
		</div>
	</div>

	{#if filteredOrders.length > 0}
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
			{#each filteredOrders as order (order.id)}
				<div in:fly={{ y: 20, duration: 300 }} out:fade={{ duration: 200 }}>
					<WaiterOrderCard {order} onStatusChange={handleStatusChange} onServed={handleServed} />
				</div>
			{/each}
		</div>
	{:else}
		<div
			class="flex flex-col items-center justify-center rounded-[3rem] border-4 border-dashed border-muted/30 py-32 text-center"
		>
			<div class="mb-6 rounded-full bg-muted/50 p-6">
				<ClipboardList class="h-12 w-12 text-muted-foreground/40" />
			</div>
			<h3 class="text-2xl font-bold text-muted-foreground">{$t('chef.no_orders')}</h3>
			<p class="mt-2 text-muted-foreground/60">{$t('chef.empty_desc')}</p>
		</div>
	{/if}
</main>
