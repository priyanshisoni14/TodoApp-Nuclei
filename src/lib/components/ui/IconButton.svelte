<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		label,
		fadeOnHover = false,
		onclick,
		children
	}: {
		label: string;
		fadeOnHover?: boolean;
		onclick?: () => void;
		children: Snippet;
	} = $props();
</script>

<button
	{onclick}
	aria-label={label}
	class="flex h-9 w-9 items-center justify-center rounded-lg transition
		{fadeOnHover ? 'opacity-100 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100' : ''}"
>
	{@render children()}
</button>