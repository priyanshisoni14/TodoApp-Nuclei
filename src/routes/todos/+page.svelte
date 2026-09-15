<script lang="ts">
	import { subscribeTodos } from '$lib/firebase/firestore';
	import { authStore } from '$lib/stores/authStore.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import TodoInput from '$lib/components/TodoInput.svelte';
	import TodoList from '$lib/components/TodoList.svelte';
	import ProgressBar from '$lib/components/ui/ProgressBar.svelte';
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

<div class="flex min-h-screen flex-col bg-gradient-to-b from-violet-50 to-white">
	<Header />

	<main class="mx-auto w-full max-w-2xl flex-1 px-6 py-10">
		{#if authStore.user}
			<div class="rounded-2xl border border-gray-100 bg-white/60 p-6 shadow-sm backdrop-blur">
				<TodoInput uid={authStore.user.uid} />
				<div class="mt-6">
					<ProgressBar done={doneCount} total={todos.length} />
					<TodoList {todos} />
				</div>
			</div>
		{/if}
	</main>

	<Footer {activeCount} />
</div>