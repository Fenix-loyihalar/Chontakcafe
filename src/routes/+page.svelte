<script>
  import Card from '$lib/components/cart/Card.svelte';
  import { UtensilsCrossed, User, ChefHat } from 'lucide-svelte';
</script>

<div class="min-h-screen bg-background text-foreground transition-colors duration-300">
  <main class="container max-w-5xl mx-auto px-4 py-12">
    <div class="text-center mb-12">
      <h2 class="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
        Raqamli buyurtma tizimi
      </h2>
      <p class="text-lg text-muted-foreground">
        Davom etish uchun rolingizni tanlang!
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <a href="/menu?table=13" class="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl">
        <Card 
          class="p-8 text-center space-y-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer h-full" 
          dataTestid="card-customer"
        >
          <div class="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <User class="h-8 w-8 text-primary" />
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-2">Mijoz</h3>
            <p class="text-sm text-muted-foreground">
              Menyuni ko'rish va buyurtma qilish
            </p>
          </div>
        </Card>
      </a>

      <a href="/girgitton" class="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-xl">
        <Card 
          class="p-8 text-center space-y-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer h-full" 
          dataTestid="card-waiter"
        >
          <div class="mx-auto w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center">
            <UtensilsCrossed class="h-8 w-8 text-orange-500" />
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-2">Girgitton</h3>
            <p class="text-sm text-muted-foreground">
              Buyurtmalarni olib borish
            </p>
          </div>
        </Card>
      </a>

      <a href="/order" class="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-xl">
        <Card 
          class="p-8 text-center space-y-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer h-full" 
          dataTestid="card-chef"
        >
          <div class="mx-auto w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
            <ChefHat class="h-8 w-8 text-red-500" />
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-2">Oshpaz</h3>
            <p class="text-sm text-muted-foreground">
              Buyurtmalarni ko'rish va tayyorlash
            </p>
          </div>
        </Card>
      </a>

    </div>
  </main>
</div>