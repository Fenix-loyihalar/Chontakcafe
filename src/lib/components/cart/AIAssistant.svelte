<script>
	import { X, Send, Bot, Utensils, Loader2 } from 'lucide-svelte';
	import { fade, slide } from 'svelte/transition';
	import { t, lang } from "$lib/i18n.js";
	let { isOpen = $bindable(false), menuItems = [], onAddCombo } = $props();

	let inputText = $state('');
	let isLoading = $state(false);

	/**
	 * @type {{ role: 'user' | 'assistant', text?: string, textKey?: string, budget?: number, combo?: any[], total?: number }[]}
	 */
	let messages = $state([
		{
			role: 'assistant',
			textKey: 'ai.greeting'
		}
	]);

	async function handleSend() {
		if (!inputText.trim() || isLoading) return;

		const userMessage = inputText.trim();
		messages.push({ role: 'user', text: userMessage });
		inputText = '';
		isLoading = true;

		try {
			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					history: messages.slice(0, -1).map((m) => ({
						role: m.role,
						text: m.text || (m.textKey ? $t(m.textKey) : '')
					})),
					userMessage: userMessage,
					language: $lang,
					menuItems: menuItems
				})
			});

			if (!response.ok) {
				throw new Error('Failed to fetch from chat API');
			}

			const parsed = await response.json();

			/** @type {any[]} */
			let combo = [];
			let total = 0;
			if (parsed.suggested_items && Array.isArray(parsed.suggested_items)) {
				parsed.suggested_items.forEach((/** @type {string} */ id) => {
					const item = menuItems.find((i) => String(i.id) === String(id));
					if (item) {
						combo.push(item);
						total += item.price;
					}
				});
			}

			messages.push({
				role: 'assistant',
				text: parsed.message,
				combo: combo.length > 0 ? combo : undefined,
				total: total
			});
		} catch (e) {
			console.error('AI Error:', e);
			messages.push({
				role: 'assistant',
				text: $lang === 'uz' ? "Kechirasiz, aloqada xatolik yuz berdi. Qaytadan urinib ko'ramizmi?" : ($lang === 'ru' ? "Извините, произошла ошибка. Попробуем еще раз?" : "Sorry, an error occurred. Shall we try again?")
			});
		} finally {
			isLoading = false;
		}
	}

	/** @param {KeyboardEvent} e */
	function handleKeyDown(e) {
		if (e.key === 'Enter') {
			handleSend();
		}
	}

	/** @param {any[]} combo */
	function addComboToCart(combo) {
		onAddCombo(combo);
		messages.push({
			role: 'assistant',
			textKey: 'ai.added'
		});
	}
</script>

{#if isOpen}
	<div
		class="fixed bottom-24 right-4 z-50 w-80 sm:w-96 rounded-2xl border border-border bg-background shadow-2xl overflow-hidden flex flex-col"
		in:fade={{ duration: 200 }}
		out:fade={{ duration: 200 }}
		style="height: 500px; max-height: 80vh;"
	>
		<!-- Header -->
		<div class="bg-primary text-primary-foreground p-4 flex items-center justify-between">
			<div class="flex items-center gap-2">
				<Bot class="w-6 h-6" />
				<h3 class="font-bold text-lg">{$t('ai.title')}</h3>
			</div>
			<button
				onclick={() => (isOpen = false)}
				class="p-1 hover:bg-primary-foreground/20 rounded-full transition-colors"
				aria-label="Close"
			>
				<X class="w-5 h-5" />
			</button>
		</div>

		<!-- Chat Area -->
		<div class="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col bg-muted/20">
			{#each messages as msg}
				<div class="flex flex-col {msg.role === 'user' ? 'items-end' : 'items-start'}">
					<div
						class="max-w-[85%] rounded-2xl p-3 {msg.role === 'user'
							? 'bg-primary text-primary-foreground rounded-tr-sm'
							: 'bg-muted text-foreground border border-border border-l-4 border-l-primary rounded-tl-sm'}"
					>
						<p class="text-sm">
							{#if msg.textKey === 'ai_success'}
								{$t('ai.success_budget1')} {(msg.budget || 0).toLocaleString()} {$t('ai.success_budget2')} {(msg.total || 0).toLocaleString()} {$t('cart.currency')})
							{:else if msg.textKey === 'ai.error_budget'}
								{(msg.budget || 0).toLocaleString()} {$t('ai.error_budget')}
							{:else if msg.textKey}
								{$t(msg.textKey)}
							{:else}
								{msg.text}
							{/if}
						</p>
					</div>

					{#if msg.combo && msg.combo.length > 0}
						<div class="mt-2 w-[90%] bg-card border border-border rounded-xl p-3 shadow-sm self-start">
							<h4 class="text-xs font-semibold uppercase text-muted-foreground mb-2">
								{$t('ai.suggested_combo')}
							</h4>
							<div class="space-y-2 mb-3">
								{#each msg.combo as item}
									<div class="flex justify-between items-center text-sm">
										<div class="flex items-center gap-2">
											<Utensils class="w-3 h-3 text-primary" />
											<span class="truncate max-w-[120px]">{item.name}</span>
										</div>
										<span class="font-medium">{item.price.toLocaleString()} {$t('cart.currency')}</span>
									</div>
								{/each}
							</div>
							<div class="pt-2 border-t border-border flex justify-between items-center mb-3">
								<span class="text-sm font-semibold">{$t('ai.total')}</span>
								<span class="text-sm font-bold text-primary">{(msg.total || 0).toLocaleString()} {$t('cart.currency')}</span>
							</div>
							<button
								onclick={() => addComboToCart(msg.combo || [])}
								class="w-full bg-primary/10 hover:bg-primary/20 text-primary font-semibold py-2 rounded-lg text-sm transition-colors"
							>
								{$t('ai.add_all')}
							</button>
						</div>
					{/if}
				</div>
			{/each}
		</div>

		{#if isLoading}
			<div class="px-4 pb-2" transition:slide>
				<div class="flex items-center gap-2 text-muted-foreground text-sm">
					<Loader2 class="w-4 h-4 animate-spin" />
					{$lang === 'uz' ? 'Yozmoqda...' : $lang === 'ru' ? 'Печатает...' : 'Typing...'}
				</div>
			</div>
		{/if}

		<!-- Input Area -->
		<div class="p-3 border-t border-border bg-background flex gap-2">
			<input
				type="text"
				bind:value={inputText}
				onkeydown={handleKeyDown}
				placeholder="{$t('ai.placeholder')}"
				class="flex-1 bg-muted rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
			/>
			<button
				onclick={handleSend}
				class="bg-primary text-primary-foreground p-2 rounded-xl hover:opacity-90 transition-opacity shrink-0"
				aria-label="Send"
			>
				<Send class="w-5 h-5" />
			</button>
		</div>
	</div>
{/if}
