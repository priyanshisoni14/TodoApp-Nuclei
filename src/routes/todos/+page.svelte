<script lang="ts">
	import { subscribeTodos } from '$lib/firebase/firestore';
	import { authStore } from '$lib/stores/authStore.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import PageBackground from '$lib/components/layout/PageBackground.svelte';
	import TodoInput from '$lib/components/TodoInput.svelte';
	import TodoList from '$lib/components/TodoList.svelte';
	import StatsPanel from '$lib/components/StatsPanel.svelte';
	import GlassCard from '$lib/components/ui/GlassCard.svelte';
	import type { Todo } from '$lib/types';

	let todos = $state<Todo[]>([]);

	$effect(() => {
		const uid = authStore.user?.uid;
		if (!uid) return;
		const unsubscribe = subscribeTodos(
			uid,
			(t) => (todos = t),
			(err) => console.error('subscribeTodos failed:', err)
		);
		return unsubscribe;
	});

	let doneCount = $derived(todos.filter((t) => t.completed).length);
	let activeCount = $derived(todos.length - doneCount);
</script>

<svelte:head><title>Todos | TodoApp</title></svelte:head>

<PageBackground blobs>
	<div class="flex min-h-screen flex-col">
		<Header />

		<main class="mx-auto w-full max-w-6xl flex-1 px-6 py-10 lg:py-16">
			{#if authStore.user}
				<div class="grid gap-8 lg:grid-cols-[320px_1fr] lg:gap-12">
					<StatsPanel done={doneCount} total={todos.length} />

					<GlassCard class="min-w-0">
						<TodoInput uid={authStore.user.uid} />
						<div class="mt-6">
							<TodoList {todos} />
						</div>
					</GlassCard>
				</div>
			{/if}
		</main>

		<Footer {activeCount} />
	</div>
</PageBackground>