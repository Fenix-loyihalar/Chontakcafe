<script>
  import Card from '$lib/components/cart/Card.svelte';
  import { Plus } from 'lucide-svelte';

  const { id, name, description, price, image, onAdd } = $props()
</script>

<Card class="overflow-hidden flex flex-col h-full group hover:shadow-md transition-all duration-300">
  <div class="relative h-48 overflow-hidden bg-muted">
    <img 
      src={image} 
      alt={name} 
      class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
    />
  </div>
  
  <div class="p-5 flex flex-col grow">
    <div class="flex justify-between items-start mb-2 gap-2">
      <h3 class="text-lg font-bold leading-tight">{name}</h3>
      <span class="font-semibold text-primary">
        ${(price / 100).toFixed(2)}
      </span>
    </div>
    
    <p class="text-sm text-muted-foreground mb-4 grow">
      {description}
    </p>
    
    <button 
      onclick={() => onAdd(id)}
      class="w-full mt-auto inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Plus class="h-4 w-4" />
      Add to Cart
    </button>
  </div>
</Card>