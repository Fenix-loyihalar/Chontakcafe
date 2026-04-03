const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const api = {
	async getMenu() {
		const res = await fetch(`${BASE_URL}/menu`);
		if (!res.ok) throw new Error('Failed to fetch menu');
		return res.json();
	},

	async createOrder(orderData) {
		const res = await fetch(`${BASE_URL}/orders`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(orderData)
		});
		if (!res.ok) throw new Error('Failed to create order');
		return res.json();
	},

	// keyin qo‘shamiz: getCategories, getOrderStatus va h.k.
};