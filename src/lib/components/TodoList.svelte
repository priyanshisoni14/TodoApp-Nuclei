<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fade, fly } from 'svelte/transition';
	import { setTodoCompleted, deleteTodo } from '$lib/firebase/firestore';
	import type { Todo } from '$lib/types';
	import TodoItem from './TodoItem.svelte';

	let { todos }: { todos: Todo[] } = $props();

	let active = $derived(todos.filter((t) => !t.completed));
	let done = $derived(todos.filter((t) => t.completed));
</script>

{#snippet section(title: string, items: Todo[], emptyText: string)}
	{#if items.length > 0 || title === 'To do'}
		<div class="mb-7">
			<h2 class="mb-2.5 flex items-center gap-2 text-xs font-semibold tracking-wide text-gray-400 uppercase">
				{title}
				<span class="rounded-full bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-500">
					{items.length}
				</span>
			</h2>
			<div class="flex flex-col gap-2">
				{#each items as todo (todo.id)}
					<div in:fly={{ y: -12, duration: 200 }} out:fade={{ duration: 150 }} animate:flip={{ duration: 200 }}>
						<TodoItem {todo} onToggle={setTodoCompleted} onDelete={deleteTodo} />
					</div>
				{:else}
					<p class="py-8 text-center text-sm text-gray-400">{emptyText}</p>
				{/each}
			</div>
		</div>
	{/if}
{/snippet}

{@render section('To do', active, 'Nothing pending — add a todo above.')}
{@render section('Done', done, 'Nothing completed yet.')}