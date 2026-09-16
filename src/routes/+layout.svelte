<script lang="ts">
	import './layout.css';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { authStore } from '$lib/stores/authStore.svelte';
	import { onMount } from 'svelte';
	import { logger } from '$lib/utils/logger';
	import FloatingCharacters from '$lib/components/ui/characters/FloatingCharacters.svelte';
	import Stars from '$lib/components/ui/Stars.svelte';

	let { children } = $props();
	onMount(() => {
		logger.debug('Initializing authStore', 'Layout');
		authStore.init();
	});

	$effect(() => {
		if (authStore.loading) return;

		const pathname = page.url.pathname;
		// Redirect to login if not authenticated and not already on the login page
		if (!authStore.isAuthenticated && pathname !== '/login') {
			goto(resolve('/login'));
			return;
		}
		// Redirect to todos if authenticated and on the login page
		if (authStore.isAuthenticated && pathname === '/login') {
			goto(resolve('/todos'));
		}
	});
</script>


{#if !authStore.loading}
	{#if authStore.isAuthenticated || page.url.pathname === '/login'}
		<div
			class="relative min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_top,#16213e_0%,#0a0f1e_55%,#060913_100%)]"
		>
			<FloatingCharacters />
			<Stars />
			<div class="relative z-10 min-h-screen">
				{@render children()}
			</div>
		</div>
	{/if}
{/if}
