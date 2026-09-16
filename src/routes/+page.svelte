<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { authStore } from '$lib/stores/authStore.svelte';

	$effect(() => {
		if (authStore.loading) return;
		goto(resolve(authStore.isAuthenticated ? '/todos' : '/login'));
	});
</script>