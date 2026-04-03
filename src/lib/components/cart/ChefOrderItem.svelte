<script>
  import Card from "$lib/components/cart/Card.svelte";
  import { Clock, ChefHat, Check } from "lucide-svelte";

  let { 
    orderId, 
    tableNumber, 
    items, 
    createdAt, 
    status, 
    onStatusChange 
  } = $props();

  // Vaqtni hisoblash
  let minutesElapsed = $state(Math.floor((new Date() - createdAt) / 60000));
  
  // Har daqiqada vaqtni yangilab turish
  const interval = setInterval(() => {
    minutesElapsed = Math.floor((new Date() - createdAt) / 60000);
  }, 60000);

  // Komponent yo'qolganda intervalni tozalash
  $effect(() => () => clearInterval(interval));

  const isPreparing = $derived(status === "in_progress");
</script>

<Card class="overflow-hidden border-l-8 transition-all {isPreparing ? 'border-l-blue-500 shadow-lg scale-[1.01]' : 'border-l-orange-500'}">
  <div class="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
    
    <div class="flex-1 space-y-4">
      <div class="flex items-center gap-4">
        <span class="text-3xl font-black italic text-primary">#{tableNumber}</span>
        <div class="flex items-center gap-2 text-muted-foreground font-medium">
          <Clock class="h-4 w-4 {minutesElapsed > 10 ? 'text-destructive animate-pulse' : ''}" />
          <span class={minutesElapsed > 10 ? 'text-destructive' : ''}>{minutesElapsed} daqiqa avval</span>
        </div>
      </div>

      <ul class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
        {#each items as item}
          <li class="flex items-center justify-between border-b border-border/40 pb-1">
            <span class="text-lg font-medium">{item.name}</span>
            <span class="bg-primary/10 text-primary px-3 py-0.5 rounded-full font-bold">x{item.quantity}</span>
          </li>
        {/each}
      </ul>
    </div>

    <div class="w-full md:w-auto flex flex-row md:flex-col gap-2">
      {#if !isPreparing}
        <button 
          onclick={() => onStatusChange(orderId, "in_progress")}
          class="flex-1 md:w-40 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <ChefHat class="h-5 w-5" /> BOSHLASH
        </button>
      {:else}
        <button 
          onclick={() => onStatusChange(orderId, "ready")}
          class="flex-1 md:w-40 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <Check class="h-5 w-5" /> TAYYOR
        </button>
      {/if}
    </div>
  </div>
</Card>