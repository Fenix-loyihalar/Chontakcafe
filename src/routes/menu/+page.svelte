<script>
	import MenuItemCard from '$lib/components/cart/MenuItemCard.svelte';
	import CartBar from '$lib/components/cart/CartBar.svelte';
	import { fade } from 'svelte/transition';
	import { page } from '$app/state';

	// --- DATA ---
	const menuItems = [
		{
			id: '1',
			name: 'Classic Burger',
			description: 'Juicy beef patty with fresh lettuce, tomato, and our special sauce',
			price: 1299,
			category: 'food',
			image: '/assets/burger.png'
		},
		{
			id: '2',
			name: 'Caesar Salad',
			description: 'Fresh romaine lettuce with parmesan, croutons, and creamy dressing',
			price: 899,
			category: 'food',
			image: '/assets/salad.png'
		},
		{
			id: '3',
			name: 'Margherita Pizza',
			description: 'Classic pizza with fresh mozzarella, basil, and tomato sauce',
			price: 1499,
			category: 'food',
			image: '/assets/pizza.png'
		},
		{
			id: '4',
			name: 'Iced Latte',
			description: 'Smooth espresso with cold milk and ice',
			price: 499,
			category: 'drinks',
			image: '/assets/latte.png'
		},
		{
			id: '5',
			name: 'Fresh Orange Juice',
			description: 'Freshly squeezed orange juice',
			price: 399,
			category: 'drinks',
			image: '/assets/juice.png'
		},
		{
			id: '6',
			name: 'Chocolate Cake',
			description: 'Rich chocolate cake with smooth ganache',
			price: 699,
			category: 'desserts',
			image: '/assets/cake.png'
		}
	];

	const categories = [
		{ id: 'food', label: 'Food' },
		{ id: 'drinks', label: 'Drinks' },
		{ id: 'desserts', label: 'Desserts' }
	];

	// --- STATE (Svelte 5 Runes) ---
	/**
	 * @type {{ quantity: number; id: string; name: string; description: string; price: number; category: string; image: string; }[]}
	 */
	let cart = $state([]);
	let activeCategory = $state('food');
	let tableNumber = $derived(page.url.searchParams.get('table') || 'N/A');

	// --- DERIVED (React-dagi useMemo o'rniga) ---
	let filteredItems = $derived(menuItems.filter((item) => item.category === activeCategory));
	let itemCount = $derived(cart.reduce((sum, item) => sum + item.quantity, 0));
	let totalPrice = $derived(cart.reduce((sum, item) => sum + item.price * item.quantity, 0));

	// --- ACTIONS ---
	function handlePlaceOrder() {
		// Buyurtmani yuborishda stol raqami endi URL-dan olingan qiymat bo'ladi
		const orderData = {
			table: tableNumber,
			items: cart,
			total: totalPrice
		};

		console.log('Yuborilayotgan buyurtma:', orderData);
		alert(`Stol №${tableNumber} uchun buyurtma qabul qilindi!`);
		cart = [];
	}
	/**
	 * @param {string} itemId
	 */
	function addToCart(itemId) {
		const item = menuItems.find((i) => i.id === itemId);
		if (!item) return;

		const existing = cart.find((i) => i.id === itemId);
		if (existing) {
			existing.quantity += 1;
		} else {
			cart.push({ ...item, quantity: 1 });
		}
	}

</script>

<div class="min-h-screen bg-background pb-32 transition-colors duration-500">
	<main class="container mx-auto max-w-7xl px-4 py-10">
		<div class="mb-10">
			<h2 class="mb-3 text-4xl font-extrabold tracking-tighter">Choose your flavor</h2>
			<p class="max-w-lg text-lg text-muted-foreground">
				Premium ingredients, hand-picked for the ultimate dining experience.
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
