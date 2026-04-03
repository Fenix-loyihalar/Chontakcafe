<script>
    import { UtensilsCrossed, Globe, ChevronDown } from "lucide-svelte";
    import { page } from '$app/stores';
    import Badge from "$lib/components/cart/Badge.svelte";
    import ThemeToggle from "$lib/components/ThemeToggle.svelte";
    import { fade, scale } from "svelte/transition";
    import { lang, t } from "$lib/i18n.js";

    let { restaurantName = "Café Delight" } = $props();

    let isLangOpen = $state(false);

    // URL: /menu?table=5 bo'lsa, 5 ni qaytaradi
    let tableNumber = $derived($page.url.searchParams.get('table'));

    // Dropdown menyuni tashqariga bosganda yopish uchun
    function closeLangMenu() {
        isLangOpen = false;
    }
</script>

{#if isLangOpen}
    <div 
        class="fixed inset-0 z-40" 
        onclick={closeLangMenu}
        onkeydown={(e) => e.key === 'Escape' && closeLangMenu()}
        role="button"
        tabindex="0"
        aria-label="Menyuni yopish"
    ></div>
{/if}

<header class="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl transition-all">
    <div class="container max-w-7xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between gap-2">
        
        <a href="/" class="group flex shrink-0 items-center gap-2 sm:gap-3">
            <div class="rounded-xl bg-primary/10 p-2 transition-all duration-300 group-hover:scale-105 group-hover:bg-primary/20">
                <UtensilsCrossed class="h-5 w-5 text-primary sm:h-6 sm:w-6" />
            </div>
            <h1 class="hidden min-[360px]:block text-base font-black uppercase tracking-tight sm:text-xl">
                {restaurantName}
            </h1>
        </a>

        <div class="flex shrink-0 items-center gap-2 sm:gap-4">
            
            {#if tableNumber}
                <div in:fade={{ duration: 300 }}>
                    <Badge
                        variant="outline" 
                        class="flex items-center gap-1 border-primary/20 bg-primary/5 px-2.5 py-1 font-mono shadow-sm sm:px-4 sm:py-1.5"
                    >
                        <span class="hidden font-bold text-primary sm:inline">{$t('header.table')}:</span>
                        <span class="font-bold text-primary sm:hidden">#</span>
                        <span class="text-xs font-bold text-foreground sm:text-sm">{tableNumber}</span>
                    </Badge>
                </div>
            {/if}

            <div class="relative z-50">
                <button 
                    onclick={() => isLangOpen = !isLangOpen}
                    class="flex items-center gap-1.5 rounded-xl border border-border/50 bg-background/50 px-2 py-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground shadow-sm transition-all hover:bg-accent hover:text-foreground hover:shadow-md active:scale-95 sm:gap-2 sm:px-3 sm:py-2 sm:text-sm"
                >
                    <Globe class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span>{$lang}</span>
                    <ChevronDown class="h-3 w-3 transition-transform duration-300 {isLangOpen ? 'rotate-180' : ''}" />
                </button>

                {#if isLangOpen}
                    <div 
                        class="absolute right-0 top-full mt-2 w-36 overflow-hidden rounded-2xl border border-border/50 bg-background/90 p-1.5 shadow-2xl backdrop-blur-2xl ring-1 ring-black/5 dark:ring-white/5"
                        in:scale={{ start: 0.95, duration: 200 }}
                        out:fade={{ duration: 150 }}
                    >
                        {#each ['uz', 'ru', 'en'] as l}
                            <button 
                                onclick={() => { $lang = l; isLangOpen = false; }}
                                class="group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold transition-all {$lang === l ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20' : 'text-muted-foreground hover:bg-accent hover:text-foreground'}"
                            >
                                <span>{l.toUpperCase()}</span>
                                {#if $lang === l}
                                    <div class="h-1.5 w-1.5 rounded-full bg-current opacity-80"></div>
                                {/if}
                            </button>
                        {/each}
                    </div>
                {/if}
            </div>

            <div class="shrink-0 scale-90 sm:scale-100">
                <ThemeToggle />
            </div>
            
        </div>
    </div>
</header>