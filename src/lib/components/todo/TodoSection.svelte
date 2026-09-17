<script lang="ts">
	import type { Todo } from '$lib/types';
	import Badge from '$lib/components/ui/Badge.svelte';
	import TodoItem from './TodoItem.svelte';

	let { title, todos }: { title: string; todos: Todo[] } = $props();
</script>

<section class="rounded-3xl border border-white/5 bg-white/[0.02] p-6">
	<h2 class="mb-4 flex items-center gap-3 text-lg font-semibold text-white">
		{title}
		<Badge text={todos.length} class="bg-white/10 px-2.5 py-0.5 text-slate-300" />
	</h2>

	<div class="space-y-3">
		{#each todos as todo (todo.id)}
			<TodoItem {todo} />
		{:else}
			<p class="py-4 text-center text-sm text-slate-500">Nothing here.</p>
		{/each}
	</div>
</section>