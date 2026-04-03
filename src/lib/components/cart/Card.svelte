<script>
	// Tashqaridan beriladigan class va data-testid'larni qabul qilish
	let { class: className = '', dataTestid = '', children } = $props();
</script>

<div
	class="rounded-xl border border-border bg-card text-card-foreground shadow-sm {className}"
	data-testid={dataTestid}
>
	{@render children()}
</div>
