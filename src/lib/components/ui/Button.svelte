<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		variant = 'primary',
		type = 'button',
		disabled = false,
		onclick,
		children
	}: {
		variant?: 'primary' | 'ghost';
		type?: 'button' | 'submit';
		disabled?: boolean;
		onclick?: () => void;
		children: Snippet;
	} = $props();

	const base = 'rounded-xl px-5 py-2.5 text-sm font-medium transition disabled:opacity-50';
	const variants = {
		primary: 'bg-violet-500 text-white shadow-sm hover:bg-violet-600',
		ghost: 'text-gray-400 hover:text-gray-600'
	};
</script>

<button {type} {disabled} {onclick} class="{base} {variants[variant]}">
	{@render children()}
</button>