<script>
	import { UtensilsCrossed } from "lucide-svelte";
	import { page } from '$app/stores'; // URL-ni kuzatish uchun
	import Badge from "$lib/components/cart/Badge.svelte";
	import ThemeToggle from "$lib/components/ThemeToggle.svelte";
	import { fade } from "svelte/transition";
	import { lang, t } from "$lib/i18n.js";

	let { restaurantName = "Café Delight" } = $props();

	// Svelte 5 derived rune orqali table raqamini olish
	// URL: /menu?table=5 bo'lsa, 5 ni qaytaradi
	let tableNumber = $derived($page.url.searchParams.get('table'));
</script>

<header class="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-xl transition-all">
	<div class="container max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
		
		<a href="/" class="flex items-center gap-3">
			<div class="bg-primary/10 p-2 rounded-xl">
				<UtensilsCrossed class="h-6 w-6 text-primary" />
			</div>
			<h1 class="text-xl font-black tracking-tight uppercase">
				{restaurantName}
			</h1>
		</a>

		<div class="flex items-center gap-4">
			{#if tableNumber}
				<div in:fade>
					<Badge
						variant="outline" 
						class="font-mono px-4 py-1.5 border-primary/20 bg-primary/5 shadow-sm"
					>
						{tableNumber}-{$t('header.table')}
					</Badge>
				</div>
			{/if}

			<select 
				bind:value={$lang} 
				class="bg-background text-foreground border border-border rounded-lg px-2 py-1 focus:ring-1 focus:ring-primary focus:outline-none"
			>
				<option value="uz">UZ</option>
				<option value="ru">RU</option>
				<option value="en">EN</option>
			</select>

			<ThemeToggle />
		</div>
	</div>
</header>