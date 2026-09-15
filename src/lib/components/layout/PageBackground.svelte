<script lang="ts">
	import type { Snippet } from 'svelte';

	let { blobs = false, children }: { blobs?: boolean; children: Snippet } = $props();
</script>

<div class="relative min-h-screen overflow-hidden bg-gradient-to-b from-violet-50 to-white">
	{#if blobs}
		<div class="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-violet-200/40 blur-3xl"></div>
		<div class="pointer-events-none absolute top-1/3 -left-32 h-80 w-80 rounded-full bg-fuchsia-100/50 blur-3xl"></div>
	{/if}
	{@render children()}
</div>