<script>
  import Card from "$lib/components/cart/Card.svelte";
  import { Clock, ChefHat, Check } from "lucide-svelte";
  import { t, lang } from "$lib/i18n.js"; // $lang ni ham qo'shdik (agar obyekt kelsa kerak bo'ladi)

  let { 
    orderId, 
    tableNumber, 
    items = [], 
    createdAt, 
    status, 
    onStatusChange 
  } = $props();

  /** * Ovqat nomini ko'rsatish uchun yordamchi funksiya
   * @param {any} item 
   */
  function renderItemName(item) {
    // 1. Agar item.name string bo'lsa (masalan: "Osh")
    if (typeof item.name === 'string') return item.name;
    
    // 2. Agar item.name obyekt bo'lsa (masalan: {uz: "Osh", en: "Plov"})
    if (typeof item.name === 'object' && item.name !== null) {
      return item.name[$lang] || item.name.uz || item.name.en || "Unknown";
    }

    // 3. Agar name bo'lmasa, zaxira sifatida "Unknown"
    return "Unknown";
  }

  // Vaqtni hisoblash (Reaktivlik uchun $derived ishlatamiz)
  let now = $state(new Date().getTime());
  
  const interval = setInterval(() => {
    now = new Date().getTime();
  }, 60000);

  $effect(() => () => clearInterval(interval));

  let minutesElapsed = $derived(Math.floor((now - new Date(createdAt).getTime()) / 60000));
  const isPreparing = $derived(status === "in_progress");
</script>

<Card class="overflow-hidden border-l-8 transition-all {isPreparing ? 'border-l-blue-500 shadow-lg scale-[1.01]' : 'border-l-orange-500'}">
  <div class="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
    
    <div class="flex-1 space-y-4 w-full">
      <div class="flex items-center gap-4">
        <span class="text-3xl font-black italic text-primary">#{tableNumber}</span>
        <div class="flex items-center gap-2 text-muted-foreground font-medium">
          <Clock class="h-4 w-4 {minutesElapsed > 10 ? 'text-destructive animate-pulse' : ''}" />
          <span class={minutesElapsed > 10 ? 'text-destructive' : ''}>
            {minutesElapsed} {$t("chef.minutes_ago")}
          </span>
        </div>
      </div>

      <ul class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
        {#each items as item}
          <li class="flex items-center justify-between border-b border-border/40 pb-2">
            <span class="text-lg font-semibold text-foreground">
              {renderItemName(item)}
            </span>
            <span class="bg-primary/10 text-primary px-3 py-0.5 rounded-full font-black text-sm">
              x{item.quantity}
            </span>
          </li>
        {/each}
      </ul>
    </div>

    <div class="w-full md:w-auto flex flex-row md:flex-col gap-2">
      {#if !isPreparing}
        <button 
          onclick={() => onStatusChange(orderId, "in_progress")}
          class="flex-1 md:w-40 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
        >
          <ChefHat class="h-5 w-5" /> {$t("chef.start")}
        </button>
      {:else}
        <button 
          onclick={() => onStatusChange(orderId, "ready")}
          class="flex-1 md:w-40 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-600/20"
        >
          <Check class="h-5 w-5" /> {$t("chef.ready")}
        </button>
      {/if}
    </div>
  </div>
</Card>