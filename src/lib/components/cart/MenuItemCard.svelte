<script>
	import Card from '$lib/components/cart/Card.svelte';
	import { Plus } from 'lucide-svelte';
	import { t } from "$lib/i18n.js";

	const { id, name, description, price, image, onAdd } = $props();
</script>

<Card
	class="group flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-md"
>
	<div class="relative h-48 overflow-hidden bg-muted">
		<img
			src={image}
			alt={name}
			class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
		/>
	</div>

	<div class="flex grow flex-col p-5">
		<div class="mb-2 flex items-start justify-between gap-2">
			<h3 class="text-lg leading-tight font-bold">{name}</h3>

			<span class="flex flex-col items-end">
					{price.toLocaleString()}
				<span class="text-xs text-muted-foreground font-semibold -mt-1.5"> {$t('cart.currency')} </span>
			</span>
		</div>

		<p class="mb-4 grow text-sm text-muted-foreground">
			{description}
		</p>

		<button
			onclick={() => onAdd(id)}
			class="mt-auto inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-secondary px-4 py-2 font-medium text-secondary-foreground transition-colors hover:bg-secondary/80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
		>
			<Plus class="h-4 w-4" />
			{$t('cart.add_to_cart')}
		</button>
	</div>
</Card>
