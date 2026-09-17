<script lang="ts">
	let {
		text,
		pill = true,
		class: extraClass = ''
	}: {
		text: string | number;
		pill?: boolean; // true = rounded-full, false = plain text (e.g. the due-date line)
		class?: string; // caller controls color, padding, weight, etc.
	} = $props();
</script>

<span class="{pill ? 'rounded-full' : ''} text-xs {extraClass}">
	{text}
</span>