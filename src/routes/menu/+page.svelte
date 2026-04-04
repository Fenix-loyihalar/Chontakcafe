<script>
    import MenuItemCard from '$lib/components/cart/MenuItemCard.svelte';
    import CartBar from '$lib/components/cart/CartBar.svelte';
    import AIAssistant from '$lib/components/cart/AIAssistant.svelte';
    import { CheckCircle2, ChefHat, Clock, Sparkles } from 'lucide-svelte'; // AI uchun chiroyliroq icon
    import { fade } from 'svelte/transition';
    import { page } from '$app/state';
    import { addNewOrder } from '$lib/stores/order.svelte'; 
    import { t, lang } from "$lib/i18n.js";

    /**
     * @type {any[]}
     */
    // @ts-ignore
    const { data } = $props();

	// @ts-ignore
	let rawMenuItems = $derived((data?.menuItems || []).map(item => {
		// Rasm uchun placeholder yaratishda nomini to'g'ri olish (object bo'lsa uzbchasini oladi)
		const itemNameForImage = (typeof item.name === 'object' && item.name !== null) 
			? (item.name.uz || 'Food') 
			: (item.name || 'Food');

		return {
			id: String(item.id),
			name: item.name,
			description: item.description,
			// Narxni songa aylantiramiz (Agar API'dan "50" kelib, vizual 50000 bo'lishi kerak bo'lsa * 1000 qilasiz)
			price: Number(item.price), 
			category: item.category || 'food',
			// Agar imageUrl null bo'lsa, Placehold.co xizmatidan foydalanamiz
			image: item.imageUrl ? item.imageUrl : `https://placehold.co/600x400?text=${encodeURIComponent(itemNameForImage)}`
		};
	}));

    // @ts-ignore
    let menuItems = $derived(rawMenuItems.map(item => ({
        ...item,
        name: (typeof item.name === 'object' && item.name !== null) ? (item.name[$lang] || item.name.uz) : item.name,
        description: (typeof item.description === 'object' && item.description !== null) ? (item.description[$lang] || item.description.uz) : item.description,
    })));

    /**
     * @type {any[] | null | undefined}
     */
    let categories = $derived([
        { id: 'food', label: $t('menu.categories.food') || 'Food' },
        { id: 'drink', label: $t('menu.categories.drinks') || 'Drinks' },
        { id: 'desserts', label: $t('menu.categories.desserts') || 'Desserts' }
    ]);

    /**
     * @type {any[]}
     */
    let cart = $state([]);
    let activeCategory = $state('food');
    let tableNumber = $derived(page.url.searchParams.get('table') || 'N/A');
    let isAIAssistantOpen = $state(false);
    
    // YENGI STATE: Muvaffaqiyatli buyurtmani saqlash uchun
    let activeSuccessOrder = $state(null); 

    let filteredItems = $derived(menuItems.filter((item) => item.category === activeCategory));
    let itemCount = $derived(cart.reduce((sum, item) => sum + item.quantity, 0));
    let totalPrice = $derived(cart.reduce((sum, item) => sum + item.price * item.quantity, 0));

    function handlePlaceOrder() {
        if (cart.length === 0) return;

        const orderData = {
            tableNumber: Number(tableNumber),
            items: cart.map((item) => ({
                itemId: item.id, // itemId qo'shildi
                name: (typeof item.name === 'object' && item.name !== null) ? item.name.uz : item.name,
                quantity: item.quantity
            })),
            totalPrice: totalPrice
        };

        addNewOrder(orderData);

        // ETA (Tahminiy vaqt) hisoblash logikasi...
        const estimatedMinutes = Math.min(10 + (itemCount * 2), 45);

        activeSuccessOrder = {
            table: tableNumber,
            eta: estimatedMinutes
        };

        cart = [];
    }

    function clearCart() {
        cart = [];
    }

    /**
     * @param {any} itemId
     */
    function addToCart(itemId) {
        // @ts-ignore
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
            <h2 class="mb-3 text-4xl font-extrabold tracking-tighter">{$t('menu.title') || 'Choose your flavor'}</h2>
            <p class="max-w-lg text-lg text-muted-foreground">
                {$t('menu.subtitle') || 'Premium ingredients, hand-picked for the ultimate dining experience.'}
            </p>
        </div>

        <div class="mb-10 flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between">
            
            <div class="flex w-fit flex-wrap gap-2 rounded-2xl border border-border/50 bg-muted/50 p-1.5">
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

            <button
                onclick={() => (isAIAssistantOpen = true)}
                class="group relative flex w-full md:w-80 lg:w-96 items-center gap-3 rounded-2xl border border-primary/20 bg-background/50 px-4 py-3 text-left text-sm text-muted-foreground shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-background hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                aria-label="Open AI Assistant"
            >
                <div class="absolute inset-0 rounded-2xl bg-linear-to-r from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"></div>
                
                <Sparkles class="h-5 w-5 text-primary animate-pulse" />
                
                <span class="flex-1 truncate">
                    {$t('menu.ai_placeholder') || 'Ask AI for recommendations...'}
                </span>
                
                <kbd class="hidden items-center gap-1 rounded bg-muted px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground sm:flex">
                    AI Chat
                </kbd>
            </button>
        </div>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {#each filteredItems as item (item.id)}
                <div in:fade={{ duration: 200 }}>
                    <MenuItemCard {...item} onAdd={addToCart} />
                </div>
            {/each}
        </div>
    </main>

    <CartBar {itemCount} {totalPrice} onPlaceOrder={handlePlaceOrder} onClearCart={clearCart} />

    <AIAssistant bind:isOpen={isAIAssistantOpen} {menuItems} onAddCombo={addMultipleToCart} />

    {#if activeSuccessOrder}
        <div 
            class="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-4 backdrop-blur-md" 
            transition:fade={{ duration: 300 }}
        >
            <div
                class="relative w-full max-w-md overflow-hidden rounded-[2.5rem] border border-border/50 bg-card p-8 text-center text-card-foreground shadow-2xl shadow-primary/10"
                in:scale={{ start: 0.9, duration: 400, delay: 100 }}
            >
                <div class="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-green-500/10 blur-3xl"></div>
                <div class="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-primary/10 blur-3xl"></div>

                <div class="relative z-10 flex flex-col items-center">
                    
                    <div class="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-green-500/20 to-emerald-500/20 text-emerald-500 ring-8 ring-emerald-500/10">
                        <CheckCircle2 class="h-12 w-12" />
                    </div>

                    <h3 class="mb-2 text-3xl font-black tracking-tight">
                        {$lang === 'uz' ? 'Buyurtma qabul qilindi!' : 'Order Placed!'}
                    </h3>
                    <p class="mb-8 text-muted-foreground">
                        {$lang === 'uz' ? `Stol #${activeSuccessOrder.table} uchun buyurtmangiz oshxonaga yuborildi.` : `Your order for Table #${activeSuccessOrder.table} has been sent to the kitchen.`}
                    </p>

                    <div class="mb-8 w-full rounded-3xl border border-border/50 bg-muted/50 p-6">
                        <div class="mb-2 flex items-center justify-center gap-3 text-primary">
                            <Clock class="h-8 w-8 animate-pulse" />
                            <span class="text-5xl font-black">{activeSuccessOrder.eta}</span>
                            <span class="mt-3 text-xl font-bold">{$lang === 'uz' ? 'daq.' : 'min.'}</span>
                        </div>
                        <p class="flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                            <ChefHat class="h-4 w-4" /> 
                            {$lang === 'uz' ? "Tahminiy tayyor bo'lish vaqti" : "Estimated Prep Time"}
                        </p>
                    </div>

                    <button
                        onclick={() => activeSuccessOrder = null}
                        class="w-full rounded-2xl bg-primary py-4 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] hover:bg-primary/90 active:scale-95"
                    >
                        {$lang === 'uz' ? 'Menyuga qaytish' : 'Back to Menu'}
                    </button>
                </div>
            </div>
        </div>
    {/if}
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