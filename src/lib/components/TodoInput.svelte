<script lang="ts">
	import { addTodo } from '$lib/firebase/firestore';
	import { validateTodoText } from '$lib/validation';
	import Button from './ui/Button.svelte';

	let { uid }: { uid: string } = $props();

	let text = $state('');
	let error = $state<string | null>(null);
	let submitting = $state(false);

	async function handleSubmit(e: Event) {
		e.preventDefault();
		const result = validateTodoText(text);
		if (!result.valid) {
			error = result.error ?? null;
			return;
		}
		error = null;
		submitting = true;
		try {
			await addTodo(uid, result.value);
			text = '';
		} catch (err) {
			console.error('addTodo failed:', err);
			error = 'Could not save todo. Try again.';
		} finally {
			submitting = false;
		}
	}
</script>

<form onsubmit={handleSubmit} class="flex flex-col gap-2 sm:flex-row sm:items-center">
	<input
		bind:value={text}
		maxlength={250}
		name="todo-text"
		id="todo-text"
		placeholder="What needs doing?"
		class="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
	/>
	<Button type="submit" disabled={submitting}>{submitting ? 'Adding…' : 'Add'}</Button>
</form>

{#if error}<p class="mt-1.5 text-xs text-red-500">{error}</p>{/if}