<script lang="ts">
	import { logger } from '$lib/utils/logger';
	import Button from '$lib/components/ui/Button.svelte';

	let {
		label,
		options,
		selected,
		onselect,
		source
	}: {
		label: string;
		options: readonly string[];
		selected: string;
		onselect: (value: string) => void;
		source: string; // just for the log tag, e.g. 'CategoryFilter'
	} = $props();

	function pick(value: string) {
		logger.debug(`${label} filter -> ${value}`, source);
		onselect(value);
	}
</script>

<div>
	<p class="mb-3 text-sm font-medium text-slate-300">{label}</p>
	<div class="grid grid-cols-3 gap-2">
		{#each options as o(o)}
			<Button text={o} width="100%" active={selected === o} onclick={() => pick(o)} />
		{/each}
	</div>
</div>