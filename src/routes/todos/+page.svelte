<script lang="ts">
	import { authStore } from '$lib/stores/authStore.svelte';
	import { todoStore } from '$lib/stores/todoStore.svelte';
	import { logger, logLifecycle } from '$lib/utils/logger';
	import AppHeader from '$lib/components/todo/AppHeader.svelte';
	import Sidebar from '$lib/components/todo/Sidebar.svelte';
	import TodoSection from '$lib/components/todo/TodoSection.svelte';

   // debugging purpose
	const SOURCE = 'TodosPage';
	logLifecycle(SOURCE);

	const name = $derived(authStore.user?.displayName?.split(' ')[0] ?? 'Crewmate');
	const uid = $derived(authStore.user?.uid ?? null);

	$effect(() => {
		logger.debug(`Auth effect ran, uid=${uid ?? 'none'}`, SOURCE);
		if (uid) todoStore.init(uid);
		return () => todoStore.destroy();
	});
</script>

<div class="mx-auto max-w-6xl px-6 py-8">
	<AppHeader {name} />

	<div class="flex flex-col gap-8 lg:flex-row">
		<main class="flex-1 space-y-6">
			{#if todoStore.loading}
				<p class="text-slate-500">Loading...</p>
			{:else}
				<TodoSection title="To Do" todos={todoStore.pending} />
				<TodoSection title="Done" todos={todoStore.done} />
			{/if}
		</main>

		{#if uid}
			<Sidebar {uid} />
		{/if}
	</div>
</div>