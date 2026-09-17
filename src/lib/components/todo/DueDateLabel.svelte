<script lang="ts">
	import { formatDueDate } from '$lib/utils/date';

	let { dueDate }: { dueDate: number | null } = $props();

	// $derived so the label recomputes if the date is ever edited in place.
	const label = $derived(formatDueDate(dueDate));
</script>

{#if label}
	<p class="mt-0.5 text-xs text-slate-500">{label}</p>
{/if}