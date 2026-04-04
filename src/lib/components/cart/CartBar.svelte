<script>
  import { ShoppingBag, Trash2 } from 'lucide-svelte';
  import { fly } from 'svelte/transition';
  import { t } from "$lib/i18n.js";

  const { itemCount = 0, totalPrice = 0, onPlaceOrder, onClearCart } = $props()
</script>

{#if itemCount > 0}
  <div 
    transition:fly={{ y: 50, duration: 300 }}
    class="fixed bottom-0 left-0 right-0 p-4 z-40 pointer-events-none"
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
            <p class="text-sm opacity-90 font-medium">{$t('cart.total') || 'Total'}</p>
            <p class="text-xl font-bold">{totalPrice.toLocaleString()} {$t('cart.currency') || 'UZS'}</p>
          </div>
        </div>

        <div class="flex items-center gap-2 sm:gap-4">
          <button 
            onclick={onClearCart}
            class="p-3 sm:px-4 sm:py-3 rounded-xl text-primary-foreground/70 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            aria-label="Clear Cart"
          >
            <Trash2 class="h-5 w-5" />
            <span class="hidden font-medium sm:inline">{$t('cart.clear') || 'Tozalash'}</span>
          </button>

          <button 
            onclick={onPlaceOrder}
            class="bg-background text-foreground hover:bg-muted font-bold px-6 py-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-background focus:ring-offset-2 focus:ring-offset-primary shadow-sm"
          >
            {$t('cart.place_order') || 'Buyurtma berish'}
          </button>
        </div>
        
      </div>
    </div>
  </div>
{/if}