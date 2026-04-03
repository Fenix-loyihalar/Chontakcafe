<!-- src/lib/components/layout/Footer.svelte -->
<footer class="bg-[#1F160F] text-amber-300">
	<div class="max-w-7xl mx-auto px-6 py-12">
		<div class="grid grid-cols-2 md:grid-cols-4 gap-8">
			<div>
				<div class="flex items-center gap-3 mb-4">
					<div class="w-8 h-8 bg-amber-500 rounded-2xl flex items-center justify-center text-xl">🫖</div>
					<span class="text-2xl font-bold text-white">Choyxona Cafe</span>
				</div>
				<p class="text-sm text-amber-400/80">
					Toshkentning eng mazali choy va taomlari<br>
					tez va qulay buyurtma
				</p>
			</div>

			<div>
				<h4 class="font-semibold text-white mb-4">Tez havolalar</h4>
				<div class="flex flex-col gap-2 text-sm">
					<a href="/menu" class="hover:text-white">Menu</a>
					<a href="/cart" class="hover:text-white">Savat</a>
					<a href="#" class="hover:text-white">Buyurtmalar tarixi</a>
				</div>
			</div>

			<div>
				<h4 class="font-semibold text-white mb-4">Aloqa</h4>
				<div class="text-sm space-y-2">
					<p>+998 99 123 45 67</p>
					<p>choyxona@cafe.uz</p>
					<p>Toshkent, Yunusobod</p>
				</div>
			</div>

			<div class="text-center md:text-right">
				<p class="text-xs text-amber-400/60 mt-auto">
					© 2026 Choyxona Cafe<br>
					Barcha huquqlar himoyalangan
				</p>
			</div>
		</div>
	</div>
</footer>