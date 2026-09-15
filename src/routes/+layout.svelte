<script lang="ts">
	import './layout.css';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { authStore } from '$lib/stores/authStore.svelte';

	let { children } = $props();

	$effect(() => {
		if (!authStore.loading && !authStore.isAuthenticated && page.url.pathname !== '/login') {
			goto(resolve('/login'));
		}
	});
</script>

{#if !authStore.loading}
	{@render children()}
{/if}