<script>
  import { Sun, Moon } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { t } from '$lib/i18n.js';

  let isDark = $state(false);

  // Sahifa yuklanganda joriy mavzuni aniqlash
  onMount(() => {
    isDark = document.documentElement.classList.contains('dark');
  });

  function toggleTheme() {
    isDark = !isDark;
    document.documentElement.classList.toggle('dark', isDark);
  }
</script>

<button
  onclick={toggleTheme}
  class="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
  aria-label={$t('theme.aria')}
>
  {#if isDark}
    <Moon class="h-5 w-5" />
  {:else}
    <Sun class="h-5 w-5" />
  {/if}
</button>