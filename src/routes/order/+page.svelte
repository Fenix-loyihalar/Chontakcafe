<script>
  import { ChefHat, Timer } from "lucide-svelte";
  import Badge from "$lib/components/cart/Badge.svelte";
  import ChefOrderItem from "$lib/components/cart/ChefOrderItem.svelte";
  import { fade, slide } from "svelte/transition";
	import { orders, updateOrderStatus } from "$lib/stores/order.svelte";
  import { t } from "$lib/i18n.js";

  let activeOrders = $derived(orders.filter(o => o.status !== "ready"));

	/** 
	 * @param {any} orderId 
	 * @param {any} newStatus 
	 */
	function handleStatusChange(orderId, newStatus) {
		updateOrderStatus(orderId, newStatus);
	}
</script>

<main class="container max-w-5xl mx-auto px-6 py-10">
  
  <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
    <div class="flex items-center gap-4">
      <div class="p-3 bg-primary/10 rounded-2xl text-primary">
        <ChefHat size={32} />
      </div>
      <div>
        <h1 class="text-4xl font-black tracking-tighter uppercase">{$t("waiter.title")}</h1>
        {#if activeOrders.length != 0}
        <p class="text-muted-foreground font-medium">{activeOrders.length} {$t("waiter.active_orders")}</p>
        {/if}
      </div>
    </div>

    <div class="flex items-center gap-2 bg-muted/50 p-2 rounded-xl border">
      <Timer class="h-4 w-4 text-muted-foreground" />
      <span class="text-sm font-bold font-mono">{$t("chef.live_feed")}</span>
      <div class="h-2 w-2 bg-green-500 rounded-full animate-ping"></div>
    </div>
  </div>

  {#if activeOrders.length === 0}
    <div 
      in:fade
      class="flex flex-col items-center justify-center py-32 text-center border-4 border-dashed rounded-4xl border-muted"
    >
      <ChefHat class="h-20 w-20 text-muted mb-6" />
      <h2 class="text-3xl font-bold text-muted-foreground tracking-tight">{$t("chef.empty_desc")}</h2>
      <p class="text-muted-foreground mt-2 max-w-xs mx-auto">
        {$t("chef.no_orders")}
      </p>
    </div>
  {:else}
    <div class="space-y-6">
      {#each activeOrders as order (order.id)}
        <div in:slide={{ duration: 300 }} out:fade={{ duration: 200 }}>
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