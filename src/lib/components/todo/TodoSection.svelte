<script lang="ts">
	import type { Todo } from '$lib/types';
	import Badge from '$lib/components/ui/Badge.svelte';
	import TodoItem from './TodoItem.svelte';
	import { isOverdue } from '$lib/utils/date';

	let { title, todos }: { title: string; todos: Todo[] } = $props();

	const overdueCount = $derived(
		todos.filter((t) => !t.completed && t.dueDate && isOverdue(t.dueDate)).length
	);
</script>

<section class="rounded-3xl border border-white/5 bg-white/2 p-6">
	<h2 class="mb-4 flex items-center gap-3 text-lg font-semibold text-white">
		{title}
		<Badge text={todos.length} class="bg-white/10 px-2.5 py-0.5 text-slate-300" />
	</h2>

	{#if overdueCount > 0}
		<div class="mb-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
			<span>⚠️</span>
			<span>{overdueCount} overdue task{overdueCount > 1 ? 's' : ''} — please review</span>
		</div>
	{/if}

	<div class="space-y-3">
		{#each todos as todo (todo.id)}
			<TodoItem {todo} />
		{:else}
			<p class="py-4 text-center text-sm text-slate-500">Nothing here.</p>
		{/each}
	</div>
</section>