<script lang="ts">
	let { checked, onchange, label }: {
		checked: boolean;
		onchange: (checked: boolean) => void;
		label: string;
	} = $props();
</script>

<button
	onclick={() => onchange(!checked)}
	aria-label={label}
	aria-pressed={checked}
	class="flex h-9 w-9 shrink-0 items-center justify-center"
>
	<span
		class="flex h-5 w-5 items-center justify-center rounded-full border-2 transition
			{checked ? 'border-violet-500 bg-violet-500' : 'border-gray-300'}"
	>
		{#if checked}
			<svg viewBox="0 0 12 12" class="h-3 w-3 fill-none stroke-white stroke-2">
				<path d="M2 6l3 3 5-6" />
			</svg>
		{/if}
	</span>
</button>