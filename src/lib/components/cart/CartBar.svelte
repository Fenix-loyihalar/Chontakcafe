<script>
  import { ShoppingBag } from 'lucide-svelte';
  import { fly } from 'svelte/transition';

  const { itemCount = 0, totalPrice = 0, onPlaceOrder } = $props()
</script>

{#if itemCount > 0}
  <div 
    transition:fly={{ y: 50, duration: 300 }}
    class="fixed bottom-0 left-0 right-0 p-4 z-50 pointer-events-none"
  >
    <div class="container max-w-5xl mx-auto pointer-events-auto">
      <div class="bg-primary text-primary-foreground rounded-2xl shadow-2xl p-4 flex items-center justify-between">
        
        <div class="flex items-center gap-4">
          <div class="relative flex items-center justify-center h-12 w-12 bg-background/20 rounded-full">
            <ShoppingBag class="h-6 w-6" />
            <span class="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs font-bold h-6 w-6 flex items-center justify-center rounded-full border-2 border-primary">
              {itemCount}
            </span>
          </div>
          <div>
            <p class="text-sm opacity-90 font-medium">Total Balance</p>
            <p class="text-xl font-bold">${(totalPrice / 100).toFixed(2)}</p>
          </div>
        </div>

        <button 
          onclick={onPlaceOrder}
          class="bg-background text-foreground hover:bg-muted font-bold px-6 py-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-background focus:ring-offset-2 focus:ring-offset-primary"
        >
          Place Order
        </button>
        
      </div>
    </div>
  </div>
{/if}