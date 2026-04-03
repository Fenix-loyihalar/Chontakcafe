<script>
  import { ChefHat, Timer } from "lucide-svelte";
  import Badge from "$lib/components/cart/Badge.svelte";
  import ChefOrderItem from "$lib/components/cart/ChefOrderItem.svelte";
  import { fade, slide } from "svelte/transition";

  // Mock Data
  let orders = $state([
    {
      id: "order-1",
      tableNumber: 5,
      status: "in_progress",
      items: [{ name: "Classic Burger", quantity: 2 }, { name: "Caesar Salad", quantity: 1 }],
      createdAt: new Date(Date.now() - 8 * 60 * 1000),
    },
    {
      id: "order-2",
      tableNumber: 3,
      status: "pending",
      items: [{ name: "Margherita Pizza", quantity: 1 }, { name: "Chocolate Cake", quantity: 1 }],
      createdAt: new Date(Date.now() - 2 * 60 * 1000),
    },
    {
      id: "order-3",
      tableNumber: 8,
      status: "pending",
      items: [
        { name: "Classic Burger", quantity: 1 }, 
        { name: "Caesar Salad", quantity: 2 },
        { name: "Fresh Orange Juice", quantity: 2 }
      ],
      createdAt: new Date(Date.now() - 1 * 60 * 1000),
    },
  ]);

  // Tayyor bo'lmagan buyurtmalarni filtrlash (Derived)
  let activeOrders = $derived(orders.filter(o => o.status !== "ready"));

  function handleStatusChange(orderId, newStatus) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    if (newStatus === "ready") {
      // Silliq yo'qolishi uchun animatsiya bilan o'chiramiz
      order.status = "ready";
      setTimeout(() => {
        orders = orders.filter(o => o.id !== orderId);
      }, 400);
    } else {
      order.status = newStatus;
    }
  }
</script>

<main class="container max-w-5xl mx-auto px-6 py-10">
  
  <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
    <div class="flex items-center gap-4">
      <div class="p-3 bg-primary/10 rounded-2xl text-primary">
        <ChefHat size={32} />
      </div>
      <div>
        <h1 class="text-4xl font-black tracking-tighter uppercase">Oshxona displayi</h1>
        {#if activeOrders.length != 0}
        <p class="text-muted-foreground font-medium">{activeOrders.length} ta aktiv buyurtma bilan ishlanmoqda</p>
        {/if}
      </div>
    </div>

    <div class="flex items-center gap-2 bg-muted/50 p-2 rounded-xl border">
      <Timer class="h-4 w-4 text-muted-foreground" />
      <span class="text-sm font-bold font-mono">LIVE FEED</span>
      <div class="h-2 w-2 bg-green-500 rounded-full animate-ping"></div>
    </div>
  </div>

  {#if activeOrders.length === 0}
    <div 
      in:fade
      class="flex flex-col items-center justify-center py-32 text-center border-4 border-dashed rounded-4xl border-muted"
    >
      <ChefHat class="h-20 w-20 text-muted mb-6" />
      <h2 class="text-3xl font-bold text-muted-foreground tracking-tight">All clear, Chef!</h2>
      <p class="text-muted-foreground mt-2 max-w-xs mx-auto">
        O'tiring va dam oling, yangi buyurtmalar shu yerda paydo boladi!
      </p>
    </div>
  {:else}
    <div class="space-y-6">
      {#each activeOrders as order (order.id)}
        <div animate:slide={{ duration: 300 }} out:fade={{ duration: 200 }}>
          <ChefOrderItem
            {...order}
            orderId={order.id}
            onStatusChange={handleStatusChange}
          />
        </div>
      {/each}
    </div>
  {/if}
</main>

<style>
  /* Oshpaz pultida matn tanlashni o'chirib qo'yamiz (tasodifiy tanlashlarni oldini olish uchun) */
  main {
    user-select: none;
  }
</style>