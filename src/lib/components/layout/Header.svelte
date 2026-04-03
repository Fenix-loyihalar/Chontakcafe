<script>
	import { UtensilsCrossed, Globe, ChevronDown } from "lucide-svelte";
	import { page } from '$app/stores'; // URL-ni kuzatish uchun
	import Badge from "$lib/components/cart/Badge.svelte";
	import ThemeToggle from "$lib/components/ThemeToggle.svelte";
	import { fade } from "svelte/transition";
	import { lang, t } from "$lib/i18n.js";

	let { restaurantName = "Café Delight" } = $props();

	let isLangOpen = $state(false);

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

			<div class="relative">
				<button 
					onclick={() => isLangOpen = !isLangOpen}
					class="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border bg-background/50 hover:bg-accent transition-colors text-sm font-semibold uppercase tracking-wider"
				>
					<Globe class="w-4 h-4 text-muted-foreground" />
					{$lang}
					<ChevronDown class="w-3 h-3 transition-transform {isLangOpen ? 'rotate-180' : ''}" />
				</button>

				{#if isLangOpen}
					<div 
						class="absolute right-0 mt-2 w-32 rounded-2xl border border-border bg-background/80 backdrop-blur-xl shadow-2xl p-1 z-50 overflow-hidden"
						in:fade={{ duration: 150 }}
						out:fade={{ duration: 100 }}
					>
						{#each ['uz', 'ru', 'en'] as l}
							<button 
								onclick={() => { $lang = l; isLangOpen = false; }}
								class="w-full text-left px-4 py-2 rounded-xl text-sm font-medium transition-all {$lang === l ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'hover:bg-accent'}"
							>
								{l.toUpperCase()}
							</button>
						{/each}
					</div>
				{/if}
			</div>

			<ThemeToggle />
		</div>
	</div>
</header>