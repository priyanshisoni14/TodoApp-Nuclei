<script lang="ts">
	import { Trash2 } from '@lucide/svelte';
	import IconButton from './ui/IconButton.svelte';
	import Checkbox from './ui/Checkbox.svelte';
	import type { Todo } from '$lib/types';

	let { todo, onToggle, onDelete }: {
		todo: Todo;
		onToggle: (id: string, completed: boolean) => void;
		onDelete: (id: string) => void;
	} = $props();
</script>

<div class="group flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
	<Checkbox
		checked={todo.completed}
		onchange={(completed) => onToggle(todo.id, completed)}
		label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
	/>

	<p class="flex-1 text-sm text-gray-800 transition {todo.completed ? 'text-gray-400 line-through' : ''}">
		{todo.text}
	</p>

	<IconButton label="Delete todo" fadeOnHover onclick={() => onDelete(todo.id)}>
		<Trash2 class="h-4 w-4 text-gray-400 hover:text-red-500" />
	</IconButton>
</div>