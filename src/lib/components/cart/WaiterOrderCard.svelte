<script lang="ts">
  import Card from "$lib/components/cart/Card.svelte";
  import Badge from "$lib/components/cart/Badge.svelte";
  import { Clock, CupSodaIcon } from "lucide-svelte";
  import { t, lang } from "$lib/i18n.js";
  import { menuItems } from "$lib/stores/menu.svelte.js";

  let { 
    order, 
    onStatusChange, 
    onServed 
  } = $props();

  // Helper to get translated item name
  /** @param {string} id */
  function getItemName(id) {
    const item = menuItems.find(i => i.id === id);
    if (!item) return "Unknown";
    return (typeof item.name === 'object') ? (item.name[$lang] || item.name.uz) : item.name;
  }

  type OrderStatus = "pending" | "in_progress" | "ready";
  type StatusConfig = Record<OrderStatus, { color: string }>;

  // Status ranglarini aniqlash
  const statusConfig: StatusConfig = {
    pending: { color: "bg-orange-500/10 text-orange-500 border-orange-500/20" },
    in_progress: { color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
    ready: { color: "bg-green-500/10 text-green-500 border-green-500/20" }
  };

  // Helper to get a valid status
  function getCurrentStatus(order: { status: string; }): OrderStatus {
    if (!order || !order.status) return 'pending';
    if (['pending', 'in_progress', 'ready'].includes(order.status)) {
      return order.status as OrderStatus;
    }
    return 'pending';
  }

  // Vaqtni formatlash (necha daqiqa oldin)
  /**
	 * @param {number} date
	 */
  function getMinutesAgo(date: number) {
    return Math.floor((new Date().getTime() - new Date(date).getTime()) / 60000);
  }
</script>

<Card class="overflow-hidden border-t-4 {order.status === 'ready' ? 'border-t-green-500' : 'border-t-primary/20'}">
  <div class="p-5">
    <div class="flex justify-between items-start mb-4">
      <div>
        <h3 class="text-xl font-bold">#{order.tableNumber}-{$t("waiter.table")}</h3>
        <p class="text-xs text-muted-foreground flex items-center gap-1 mt-1">
          <Clock class="h-3 w-3" /> {getMinutesAgo(order.createdAt)} {$t("chef.minutes_ago")}
        </p>
      </div>
      <Badge class={statusConfig[getCurrentStatus(order)].color}>
        {$t("status." + getCurrentStatus(order))}
      </Badge>
    </div>

    <div class="space-y-3 mb-6">
      {#each order.items as item}
        <div class="flex justify-between text-sm border-b border-dashed pb-1 italic">
          <span>{getItemName(item.itemId)}</span>
          <span class="font-bold text-primary">x{item.quantity}</span>
        </div>
      {/each}
    </div>

    <div class="flex justify-between items-center mb-4">
      <span class="text-xs text-muted-foreground uppercase tracking-widest font-semibold">{$t("waiter.total")}</span>
      <span class="text-lg font-black">{order.totalPrice.toLocaleString()} {$t('cart.currency')}</span>
    </div>

    <div class="grid grid-cols-2 gap-2">
      {#if order.status !== 'ready'}
        <button 
          onclick={() => onStatusChange(order.id, order.status === 'pending' ? 'in_progress' : 'ready')}
          class="col-span-2 py-2 rounded-lg bg-secondary text-secondary-foreground font-bold hover:bg-secondary/80 transition-all text-sm"
        >
          {order.status === 'pending' ? $t("waiter.mark_preparing") : $t("waiter.mark_ready")}
        </button>
      {:else}
        <button 
          onclick={() => onServed(order.id)}
          class="col-span-2 py-2 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 transition-all flex items-center justify-center gap-2"
        >
          <CupSodaIcon class="h-4 w-4" /> {$t("waiter.served")}
        </button>
      {/if}
    </div>
  </div>
</Card>