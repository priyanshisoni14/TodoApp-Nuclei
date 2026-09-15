<script lang="ts">
	import type { Snippet } from 'svelte';

	let { class: className = '', children }: { class?: string; children: Snippet } = $props();
</script>

<div class="rounded-2xl border border-gray-100 bg-white/60 p-6 shadow-sm backdrop-blur {className}">
	{@render children()}
</div>