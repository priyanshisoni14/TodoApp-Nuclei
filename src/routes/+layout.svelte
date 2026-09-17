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
	import Spinner from '$lib/components/ui/Spinner.svelte';

	let { children } = $props();
	// Initialize the authStore on component mount
	// This ensures that the authentication state is checked and set up when the layout is loaded
	// runs once when the layout is first rendered, and it will not run again on subsequent renders
	// unless the component is unmounted and remounted.
	onMount(() => {
		logger.debug('Initializing authStore', 'Layout');
		authStore.init();
	});
	// Watch for changes in the authStore and redirect accordingly
	$effect(() => {
		if (authStore.loading) return;

		const pathname = page.url.pathname;
		// Redirect to login if not authenticated and not already on the login page
		if (!authStore.isAuthenticated && pathname !== '/login') {
			goto(resolve('/login'));
			return;
		}

		// Redirect to todos if authenticated and tries to go on some other non existent path
		if (authStore.isAuthenticated && pathname !== '/todos') {
			goto(resolve('/todos'));
		}
	});
</script>

<div
	class="relative min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_top,#16213e_0%,#0a0f1e_55%,#060913_100%)]"
>
	<FloatingCharacters />
	<Stars />
	<div class="relative z-10 min-h-screen">
		{#if authStore.loading}
			<div class="flex min-h-screen justify-center items-center">
				<Spinner class="h-4 w-4 text-gray-400"/>
			</div>
		{:else}
			{@render children()}
		{/if}
	</div>
</div>
