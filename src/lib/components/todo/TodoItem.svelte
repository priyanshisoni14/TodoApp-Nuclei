<script lang="ts">
	import { CATEGORY_COLOR, type Todo } from '$lib/types';
	import { isOverdue, formatDueDate } from '$lib/utils/date';
	import { todoStore } from '$lib/stores/todoStore.svelte';
	import { logger } from '$lib/utils/logger';
	import Button from '$lib/components/ui/Button.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';

	let { todo }: { todo: Todo } = $props();

	const SOURCE = 'TodoItem';

	async function onToggle() {
		logger.debug(`Toggling todo ${todo.id}`, SOURCE);
		try {
			await todoStore.toggle(todo);
		} catch (err) {
			logger.error(`Failed to toggle todo ${todo.id}`, SOURCE, err);
		}
	}

	async function onDelete() {
		logger.debug(`Deleting todo ${todo.id}`, SOURCE);
		try {
			await todoStore.remove(todo.id);
		} catch (err) {
			logger.error(`Failed to delete todo ${todo.id}`, SOURCE, err);
		}
	}
</script>

<div
	class="group flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-900/70 px-5 py-4 backdrop-blur-sm"
>
	<input
		type="checkbox"
		checked={todo.completed}
		onchange={onToggle}
		class="h-5 w-5 rounded-md border-white/30 bg-transparent text-white focus:ring-0"
	/>

	<div class="min-w-0 flex-1">
		<p
			class="truncate text-sm font-medium {todo.completed
				? 'text-slate-500 line-through'
				: 'text-white'}"
		>
			{todo.text}
		</p>

		{#if todo.dueDate}
			<span
				class="mt-0.5 text-xs font-medium {!todo.completed && isOverdue(todo.dueDate)
					? 'text-red-400'
					: 'text-slate-500'}"
			>
				{formatDueDate(todo.dueDate)}
			</span>
		{/if}
	</div>

	<Badge
		text={todo.category}
		class="px-3 py-1 font-semibold text-white capitalize {CATEGORY_COLOR[todo.category]}"
	/>

	<Button
		text="✕"
		plain
		onclick={onDelete}
		ariaLabel="Delete task"
		class="text-slate-600 opacity-0 group-hover:opacity-100 hover:text-red-400"
	/>
</div>
