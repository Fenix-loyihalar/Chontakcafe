<script>
  const { variant = 'default', class: className = '', children } = $props()// 'default' yoki 'outline'
</script>

<div
  class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
  {variant === 'outline' ? 'border border-border text-foreground' : 'bg-primary text-primary-foreground hover:bg-primary/80'} {className}"
>
  {@render children()}
</div>