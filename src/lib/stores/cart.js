import { $state, $derived } from 'svelte/reactivity';

export const cart = $state({ items: [] });

export function addToCart(item) {
	const existing = cart.items.find(i => i.id === item.id);
	if (existing) {
		existing.quantity++;
	} else {
		cart.items.push({ ...item, quantity: 1 });
	}
}

export function removeFromCart(id) {
	cart.items = cart.items.filter(i => i.id !== id);
}

export function updateQuantity(id, quantity) {
	const item = cart.items.find(i => i.id === id);
	if (item) item.quantity = Math.max(1, quantity);
}

export const totalPrice = $derived(
	cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

export const totalItems = $derived(
	cart.items.reduce((sum, item) => sum + item.quantity, 0)
);