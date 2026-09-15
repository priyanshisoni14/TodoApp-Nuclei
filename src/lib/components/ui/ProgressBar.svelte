<script lang="ts">
	let { done, total }: { done: number; total: number } = $props();
	let percent = $derived(total === 0 ? 0 : Math.round((done / total) * 100));
</script>

{#if total > 0}
	<div class="mb-6">
		<div class="mb-1.5 flex justify-between text-xs text-gray-400">
			<span>{done} of {total} done</span>
			<span>{percent}%</span>
		</div>
		<div class="h-1.5 overflow-hidden rounded-full bg-gray-100">
			<div
				class="h-full rounded-full bg-violet-500 transition-all duration-300"
				style="width: {percent}%"
			></div>
		</div>
	</div>
{/if}