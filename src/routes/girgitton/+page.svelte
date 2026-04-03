<script>
  import { ClipboardList, Filter } from "lucide-svelte";
  import WaiterOrderCard from "$lib/components/cart/WaiterOrderCard.svelte";
  import { fade, fly } from "svelte/transition";

  // Mock data (Real loyihada buni API dan olasiz)
  let orders = $state([
    {
      id: "order-1",
      tableNumber: 5,
      status: "ready",
      items: [{ name: "Classic Burger", quantity: 2 }, { name: "Iced Latte", quantity: 1 }],
      totalPrice: 3097,
      createdAt: new Date(Date.now() - 15 * 60 * 1000),
    },
    {
      id: "order-2",
      tableNumber: 3,
      status: "in_progress",
      items: [{ name: "Caesar Salad", quantity: 1 }, { name: "Fresh Orange Juice", quantity: 2 }],
      totalPrice: 1697,
      createdAt: new Date(Date.now() - 8 * 60 * 1000),
    },
    {
      id: "order-3",
      tableNumber: 8,
      status: "pending",
      items: [{ name: "Margherita Pizza", quantity: 1 }, { name: "Chocolate Cake", quantity: 2 }],
      totalPrice: 2897,
      createdAt: new Date(Date.now() - 2 * 60 * 1000),
    }
  ]);

  let activeFilter = $state("all");

  // Reaktiv filtrlar (Derived)
  const filteredOrders = $derived(
    activeFilter === "all" ? orders : orders.filter(o => o.status === activeFilter)
  );

  const stats = $derived({
    all: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    in_progress: orders.filter(o => o.status === "in_progress").length,
    ready: orders.filter(o => o.status === "ready").length,
  });

  // Funksiyalar
  /**
	 * @param {string} orderId
	 * @param {string} newStatus
	 */
  function handleStatusChange(orderId, newStatus) {
    const order = orders.find(o => o.id === orderId);
    if (order) order.status = newStatus; // Svelte 5 da to'g'ridan-to'g'ri o'zgartirish kifoya
  }

  /**
	 * @param {string} orderId
	 */
  function handleServed(orderId) {
    orders = orders.filter(o => o.id !== orderId);
  }
</script>

<main class="container max-w-7xl mx-auto px-4 py-8">
  <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
    <div>
      <div class="flex items-center gap-2 text-primary mb-2">
        <ClipboardList class="h-5 w-5" />
        <span class="font-bold uppercase tracking-widest text-xs">Live Kitchen Feed</span>
      </div>
      <h2 class="text-4xl font-black tracking-tighter">Buyurtmalar paneli</h2>
    </div>

    <div class="flex flex-wrap gap-2 p-1.5 bg-muted rounded-xl border border-border/50">
      {#each ['all', 'pending', 'in_progress', 'ready'] as filter}
        <button
          onclick={() => activeFilter = filter}
          class="px-5 py-2 rounded-lg text-xs font-bold transition-all
          {activeFilter === filter 
            ? 'bg-background text-primary shadow-sm' 
            : 'text-muted-foreground hover:text-foreground'}"
        >
          {filter.replace('_', ' ').toUpperCase()} ({stats[filter]})
        </button>
      {/each}
    </div>
  </div>

  {#if filteredOrders.length > 0}
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {#each filteredOrders as order (order.id)}
        <div in:fly={{ y: 20, duration: 300 }} out:fade>
          <WaiterOrderCard 
            {order} 
            onStatusChange={handleStatusChange} 
            onServed={handleServed} 
          />
        </div>
      {/each}
    </div>
  {:else}
    <div class="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-3xl opacity-50">
      <div class="bg-muted p-4 rounded-full mb-4">
        <Filter class="h-8 w-8 text-muted-foreground" />
      </div>
      <p class="text-xl font-medium">No orders found in this category</p>
      <p class="text-sm text-muted-foreground">Everything is currently up to date.</p>
    </div>
  {/if}
</main>

<style>
  /* Svelte 5 da stilar juda yengil ishlaydi */
  :global(body) {
    background-color: hsl(var(--background));
  }
</style>