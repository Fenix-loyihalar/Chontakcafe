// src/lib/stores/orders.svelte.ts
let orders = $state([
	{
		id: "order-1",
		tableNumber: 5,
		status: "in_progress",
		items: [{ name: "Classic Burger", quantity: 2 }, { name: "Caesar Salad", quantity: 1 }],
		createdAt: new Date(Date.now() - 8 * 60 * 1000),
		totalPrice: 95000
	},
	{
		id: "order-2",
		tableNumber: 3,
		status: "pending",
		items: [{ name: "Margherita Pizza", quantity: 1 }, { name: "Chocolate Cake", quantity: 1 }],
		createdAt: new Date(Date.now() - 2 * 60 * 1000),
		totalPrice: 80000
	}
]);

// ====================== FUNKSIYALAR ======================
/** @param {any} newOrder */
export function addNewOrder(newOrder) {
	orders.unshift({
		...newOrder,
		id: `order-${Date.now()}`,
		createdAt: new Date(),
		status: "pending"
	});
}

/** 
 * @param {any} orderId 
 * @param {any} newStatus 
 */
export function updateOrderStatus(orderId, newStatus) {
	const order = orders.find(o => o.id === orderId);
	if (!order) return;

	if (newStatus === "ready") {
		order.status = "ready";
		setTimeout(() => {
			const index = orders.findIndex(o => o.id === orderId);
			if (index > -1) orders.splice(index, 1);
		}, 400);
	} else {
		order.status = newStatus;
	}
}

/** @param {any} orderId */
export function markAsServed(orderId) {
	const index = orders.findIndex(o => o.id === orderId);
	if (index > -1) orders.splice(index, 1);
}

// Export qilamiz
export { orders };