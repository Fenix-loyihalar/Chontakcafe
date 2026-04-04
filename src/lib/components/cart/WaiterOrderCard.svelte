<script lang="ts">
  import Card from "$lib/components/cart/Card.svelte";
  import Badge from "$lib/components/cart/Badge.svelte";
  import { Clock, CheckCircle2, Navigation } from "lucide-svelte"; // Yaxshiroq iconlar
  import { t, lang } from "$lib/i18n.js";

  let { 
    order, 
    onServed 
  } = $props();

  // Ovqat nomini tarjima qilish (Oshpaz panelidagi bilan bir xil)
  function renderItemName(item: any) {
    if (typeof item.name === 'string') return item.name;
    if (typeof item.name === 'object' && item.name !== null) {
      return item.name[$lang] || item.name.uz || item.name.en || "Unknown";
    }
    return "Unknown";
  }

  // Vaqtni hisoblash (Reaktiv)
  let now = $state(new Date().getTime());
  const interval = setInterval(() => { now = new Date().getTime(); }, 60000);
  $effect(() => () => clearInterval(interval));

  let minutesAgo = $derived(Math.floor((now - new Date(order.createdAt).getTime()) / 60000));
  
  // Faqat 'ready' bo'lsa yashil fon beramiz
  const isReady = $derived(order.status === 'ready');
</script>

<Card class="overflow-hidden border-t-4 transition-all {isReady ? 'border-t-green-500 bg-green-50/30 dark:bg-green-900/10 shadow-lg' : 'border-t-blue-400 opacity-80'}">
  <div class="p-5">
    <div class="flex justify-between items-start mb-4">
      <div>
        <div class="flex items-center gap-2">
           <h3 class="text-2xl font-black tracking-tighter">#{order.tableNumber}</h3>
           <span class="text-xs font-bold uppercase text-muted-foreground">{$t("waiter.table")}</span>
        </div>
        <p class="text-[10px] text-muted-foreground flex items-center gap-1 mt-1 font-medium uppercase tracking-wider">
          <Clock class="h-3 w-3" /> {minutesAgo} {$t("chef.minutes_ago")}
        </p>
      </div>

      <Badge class="{isReady ? 'bg-green-500 text-white' : 'bg-blue-100 text-blue-600'} border-none px-3 py-1 rounded-full text-[10px] font-bold">
        {isReady ? $t("status.ready") : $t("status.in_progress")}
      </Badge>
    </div>

    <div class="space-y-2 mb-6 bg-white/50 dark:bg-black/20 rounded-xl p-3 border border-dashed">
      {#each order.items as item}
        <div class="flex justify-between text-sm items-center">
          <span class="font-medium text-zinc-700 dark:text-zinc-300">{renderItemName(item)}</span>
          <span class="font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-md text-xs">x{item.quantity}</span>
        </div>
      {/each}
    </div>

    <div class="flex justify-between items-center mb-5 px-1">
      <span class="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{$t("waiter.total")}</span>
      <span class="text-xl font-black text-zinc-900 dark:text-zinc-100">{order.totalPrice.toLocaleString()} <small class="text-[10px] font-normal">{$t('cart.currency')}</small></span>
    </div>

    <div class="w-full">
      {#if isReady}
        <button 
          onclick={() => onServed(order.id)}
          class="w-full py-4 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 active:scale-95"
        >
          <CheckCircle2 class="h-5 w-5" /> 
          {$t("waiter.served").toUpperCase()}
        </button>
      {:else}
        <div class="w-full py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 text-center text-xs font-bold flex items-center justify-center gap-2 border border-zinc-200 dark:border-zinc-700">
          <Navigation class="h-4 w-4 animate-pulse" /> 
          {$t("status.in_progress").toUpperCase()}...
        </div>
      {/if}
    </div>
  </div>
</Card>