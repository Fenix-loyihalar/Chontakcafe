<script>
    import { X, Send, Sparkles, UtensilsCrossed, Users, Wallet, Loader2 } from 'lucide-svelte';
    import { fade, scale, fly } from 'svelte/transition';
    import { t, lang } from '$lib/i18n.js';
    import { tick } from 'svelte';

    let { isOpen = $bindable(false), menuItems = [], onAddCombo } = $props();

    let inputText = $state('');
    let chatContainer = $state();
    let isThinking = $state(false); 
    
    // Boshida bo'sh bo'ladi, shunda markazdagi chiroyli "Hero" qismi chiqib turadi
    let messages = $state([]); 

    // Avtomatik pastga skroll qilish (Svelte 5 $effect)
    $effect(() => {
        if (messages.length && chatContainer) {
            tick().then(() => {
                chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: 'smooth' });
            });
        }
    });

    async function handleSend() {
        if (!inputText.trim() || isThinking) return;

        const userMessage = inputText.trim();
        messages.push({ role: 'user', text: userMessage });
        inputText = '';
        isThinking = true;

        // UI-da chiroyli ko'rsatish uchun foydalanuvchi yozganidan byudjet/odam sonini qidirish (Visual effect)
        const numbers = userMessage.match(/\d+/g);
        let displayBudget = 0;
        let displayPeople = 1;

        if (numbers) {
            if (numbers.length >= 2) {
                let n1 = parseInt(numbers[0], 10);
                let n2 = parseInt(numbers[1], 10);
                if (n1 < 50) {
                    displayPeople = n1;
                    displayBudget = n1 * n2;
                } else {
                    displayPeople = n2;
                    displayBudget = n1 * n2;
                }
            } else {
                displayBudget = parseInt(numbers[0], 10);
            }
        }

        try {
            // Haqiqiy Backend API ga murojaat qilish
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    history: messages.slice(0, -1).map((m) => ({
                        role: m.role,
                        text: m.text
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

            let combo = [];
            let total = 0;
            
            // API qaytargan ID'lar orqali taomlarni topish
            if (parsed.suggested_items && Array.isArray(parsed.suggested_items)) {
                parsed.suggested_items.forEach((id) => {
                    const item = menuItems.find((i) => String(i.id) === String(id));
                    if (item) {
                        combo.push(item);
                        total += item.price;
                    }
                });
            }

            // Agar API'dan set kelgan bo'lsa
            if (combo.length > 0) {
                messages.push({
                    role: 'assistant',
                    type: 'combo',
                    text: parsed.message, // API'dan kelgan izoh matni
                    budget: displayBudget > 0 ? displayBudget : total, // Agar regex ishlamasa totalni ko'rsatish
                    people: displayPeople,
                    combo: combo,
                    total: total
                });
            } else {
                // Agar shunchaki savol so'ralgan bo'lsa (Set yo'q)
                messages.push({
                    role: 'assistant',
                    text: parsed.message || ($lang === 'uz' ? 'Kechirasiz, mos menyu topilmadi.' : 'Sorry, no matching menu found.')
                });
            }

        } catch (e) {
            console.error('AI Error:', e);
            messages.push({
                role: 'assistant',
                text: $lang === 'uz' ? "Kechirasiz, aloqada xatolik yuz berdi. Qaytadan urinib ko'ramizmi?" : ($lang === 'ru' ? "Извините, произошла ошибка. Попробуем еще раз?" : "Sorry, an error occurred. Shall we try again?")
            });
        } finally {
            isThinking = false;
        }
    }

    function addComboToCart(combo) {
        onAddCombo(combo);
        messages.push({
            role: 'assistant',
            text: $t('ai.added') || ($lang === 'uz' ? "Set savatga muvaffaqiyatli qo'shildi! Yana nimadir xohlaysizmi?" : "Combo added to cart successfully!")
        });
    }
</script>

{#if isOpen}
    <div
        class="fixed inset-0 z-40 bg-zinc-950/70 backdrop-blur-xl transition-all"
        transition:fade={{ duration: 400 }}
    ></div>

    <div
        class="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
    >
        <div
            class="pointer-events-auto relative flex h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/70 shadow-[0_0_80px_rgba(0,0,0,0.4)] backdrop-blur-3xl sm:h-[80vh] sm:rounded-[3.5rem] dark:border-white/10 dark:bg-zinc-900/70"
            in:scale={{ start: 0.95, duration: 400, opacity: 0 }}
            out:fade={{ duration: 200 }}
        >
            <div
                class="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-60 mix-blend-screen dark:mix-blend-lighten"
            >
                <div
                    class="absolute -top-32 -left-32 h-96 w-96 animate-pulse rounded-full bg-primary/40 blur-[100px]"
                ></div>
                <div
                    class="absolute top-1/2 -right-32 h-[30rem] w-[30rem] rounded-full bg-indigo-500/30 blur-[120px]"
                ></div>
                <div
                    class="absolute -bottom-32 left-1/4 h-80 w-80 animate-bounce rounded-full bg-rose-500/20 blur-[100px]"
                    style="animation-duration: 8s;"
                ></div>
            </div>

            <div
                class="relative z-10 flex items-center justify-between border-b border-black/5 px-8 py-6 dark:border-white/5"
            >
                <div class="flex items-center gap-4">
                    <div
                        class="rounded-2xl bg-gradient-to-tr from-primary to-indigo-500 p-3 text-white shadow-lg shadow-primary/30"
                    >
                        <Sparkles class="h-6 w-6" />
                    </div>
                    <div>
                        <h3 class="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                            {$t('ai.title') || 'AI Oshpaz'}
                        </h3>
                        <p
                            class="mt-0.5 text-xs font-medium tracking-widest text-zinc-500 uppercase dark:text-zinc-400"
                        >
                            {$lang === 'uz' ? 'Sizning shaxsiy ofitsiatingiz' : 'Your personal waiter'}
                        </p>
                    </div>
                </div>
                <button
                    onclick={() => (isOpen = false)}
                    class="rounded-full bg-black/5 p-3 transition-all hover:bg-black/10 active:scale-95 dark:bg-white/5 dark:hover:bg-white/10"
                >
                    <X class="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
                </button>
            </div>

            <div
                bind:this={chatContainer}
                class="scrollbar-hide relative z-10 flex flex-1 flex-col space-y-8 overflow-y-auto p-6 sm:p-10 {messages.length === 0 ? 'items-center justify-center' : ''}"
            >
                {#if messages.length === 0}
                    <div class="mx-auto max-w-xl text-center" in:fade={{ delay: 200 }}>
                        <div
                            class="mx-auto mb-8 flex h-24 w-24 rotate-3 items-center justify-center rounded-[2rem] border border-white/20 bg-white/50 shadow-2xl backdrop-blur-md transition-all duration-500 hover:rotate-0 dark:bg-white/5"
                        >
                            <UtensilsCrossed class="h-12 w-12 text-primary" />
                        </div>
                        <h1
                            class="mb-4 text-4xl leading-tight font-extrabold tracking-tight text-zinc-900 sm:text-5xl dark:text-white"
                        >
                            {$lang === 'uz' ? 'Bugun nimaga' : 'What would you like'} <span
                                class="bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent"
                                >{$lang === 'uz' ? 'buyurtma' : 'to order'}</span
                            > {$lang === 'uz' ? 'berasiz?' : 'today?'}
                        </h1>
                        <p class="text-lg text-zinc-600 dark:text-zinc-400">
                            {$lang === 'uz' 
                                ? "Necha kishiligingizni va qancha byudjetingiz borligini aytsangiz, men eng zo'r setni yig'ib beraman." 
                                : "Tell me how many people and your budget, and I'll create the perfect set for you."}
                        </p>
                        <div class="mt-8 flex flex-wrap justify-center gap-3">
                            <button onclick={() => inputText = "5 kishimiz, 30 mingdan tushadigan set"} class="rounded-full bg-black/5 px-4 py-2 text-sm font-medium text-zinc-600 transition hover:bg-black/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-white/10">
                                "5 kishimiz, 30 mingdan tushadigan set"
                            </button>
                            <button onclick={() => inputText = "150 000 so'mga shirinliklar"} class="rounded-full bg-black/5 px-4 py-2 text-sm font-medium text-zinc-600 transition hover:bg-black/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-white/10">
                                "150 000 so'mga shirinliklar"
                            </button>
                        </div>
                    </div>
                {:else}
                    {#each messages as msg}
                        <div
                            in:fly={{ y: 20, duration: 400 }}
                            class="flex flex-col {msg.role === 'user' ? 'items-end' : 'items-start'} w-full"
                        >
                            {#if msg.role === 'user'}
                                <div
                                    class="max-w-[80%] rounded-[2rem] rounded-tr-md bg-zinc-900 px-6 py-4 text-lg font-medium text-white shadow-xl dark:bg-white dark:text-zinc-900"
                                >
                                    {msg.text}
                                </div>
                            {:else}
                                {#if msg.text}
                                    <div
                                        class="max-w-[80%] mb-4 rounded-[2rem] rounded-tl-md border border-black/5 bg-white px-6 py-4 text-lg text-zinc-800 shadow-md dark:border-white/5 dark:bg-zinc-800 dark:text-zinc-200"
                                    >
                                        {msg.text}
                                    </div>
                                {/if}

                                {#if msg.type === 'combo' && msg.combo}
                                    <div
                                        class="w-full max-w-2xl rounded-[2.5rem] border border-white/40 bg-white/60 p-6 shadow-2xl backdrop-blur-xl sm:p-8 dark:border-white/10 dark:bg-zinc-800/60"
                                    >
                                        <div class="mb-6 flex flex-wrap items-center gap-4">
                                            <div class="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 font-bold text-primary">
                                                <Users class="h-5 w-5" />
                                                <span>{msg.people} {$lang === 'uz' ? 'kishi' : 'people'}</span>
                                            </div>
                                            <div class="flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-2 font-bold text-emerald-600 dark:text-emerald-400">
                                                <Wallet class="h-5 w-5" />
                                                <span>{$lang === 'uz' ? 'Byudjet:' : 'Budget:'} {(msg.budget || msg.total).toLocaleString()} UZS</span>
                                            </div>
                                        </div>

                                        <h4 class="mb-4 text-sm font-bold tracking-widest text-zinc-500 uppercase dark:text-zinc-400">
                                            {$t('ai.suggested_combo') || 'Tavsiya etilgan Set'}
                                        </h4>

                                        <div class="mb-8 space-y-3">
                                            {#each msg.combo as item}
                                                <div class="group flex items-center justify-between rounded-2xl border border-white/20 bg-white/50 p-4 transition-colors hover:bg-white dark:border-white/5 dark:bg-black/20 dark:hover:bg-black/40">
                                                    <span class="font-medium text-zinc-800 dark:text-zinc-200">{item.name}</span>
                                                    <span class="font-bold text-primary">{item.price.toLocaleString()} UZS</span>
                                                </div>
                                            {/each}
                                        </div>

                                        <div class="mb-6 flex items-center justify-between border-t border-black/5 pt-6 dark:border-white/10">
                                            <span class="text-lg font-semibold text-zinc-600 dark:text-zinc-400">{$t('ai.total') || 'Jami hisob:'}</span>
                                            <span class="text-3xl font-black text-zinc-900 dark:text-white">
                                                {(msg.total || 0).toLocaleString()} <span class="text-lg text-zinc-500">UZS</span>
                                            </span>
                                        </div>

                                        <button
                                            onclick={() => addComboToCart(msg.combo || [])}
                                            class="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-lg font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 active:scale-[0.98]"
                                        >
                                            <UtensilsCrossed class="h-5 w-5" />
                                            {$t('ai.add_all') || "Barcha setni savatga qo'shish"}
                                        </button>
                                    </div>
                                {/if}
                            {/if}
                        </div>
                    {/each}
                {/if}

                {#if isThinking}
                    <div class="flex items-center gap-3 text-zinc-500 dark:text-zinc-400" in:fade>
                        <Loader2 class="h-5 w-5 animate-spin text-primary" />
                        <span class="animate-pulse text-sm font-medium">
                            {$lang === 'uz' ? "Eng zo'r kombinatsiyalarni izlayapman..." : ($lang === 'ru' ? "Ищу лучшие комбинации..." : "Finding the perfect combinations...")}
                        </span>
                    </div>
                {/if}
            </div>

            <div class="relative z-10 w-full px-6 pb-6 sm:px-10 sm:pb-10">
                <div
                    class="group relative flex flex-col rounded-4xl bg-black/3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-2xl transition-all duration-500 focus-within:bg-white/80 hover:bg-black/5 dark:bg-white/3 dark:shadow-none dark:focus-within:bg-zinc-800/90 dark:hover:bg-white/5"
                >
                    <textarea
                        bind:value={inputText}
                        onkeydown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        disabled={isThinking}
                        rows="2"
                        placeholder={$t('ai.placeholder') || '"Kengroq yozing: Biz 5 kishimiz, 30 mingdan set kerak..."'}
                        class="scrollbar-hide min-h-22.5 w-full resize-none border-none bg-transparent px-6 pt-6 pb-2 text-[1.1rem] text-zinc-800 outline-none placeholder:text-zinc-400 focus:border-none focus:ring-0 focus:outline-none disabled:opacity-50 sm:text-lg dark:text-zinc-100"
                    ></textarea>

                    <div class="flex items-end justify-between px-4 pb-4">
                        <div
                            class="pb-1 pl-2 text-[11px] font-semibold tracking-widest text-zinc-400/80 uppercase opacity-0 transition-opacity duration-300 group-focus-within:opacity-100"
                        >
                            ↵ Enter tugmasini bosing
                        </div>

                        <button
                            onclick={handleSend}
                            disabled={isThinking || !inputText.trim()}
                            class="flex items-center justify-center rounded-2xl bg-zinc-900 p-3.5 text-white shadow-lg shadow-black/10 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100 dark:bg-white dark:text-zinc-900 dark:shadow-white/10"
                        >
                            {#if isThinking}
                                <Loader2 class="h-5 w-5 animate-spin" />
                            {:else}
                                <Send class="ml-0.5 h-5 w-5" />
                            {/if}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }
    .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
</style>