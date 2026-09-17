<script lang="ts">
	import { todoStore } from '$lib/stores/todoStore.svelte';
	import { CATEGORIES, type Category } from '$lib/types';
	import { logger, logLifecycle } from '$lib/utils/logger';
	import Button from '$lib/components/ui/Button.svelte';

	let { uid }: { uid: string } = $props();

	const SOURCE = 'AddTaskForm';
	logLifecycle(SOURCE);

	let text = $state('');
	let category = $state<Category>('personal');
	let due = $state(''); // yyyy-mm-dd from the native date input
	let error = $state('');

	function submit() {
		// Convert the date string to epoch ms at local midnight, or null.
		const dueDate = due ? new Date(`${due}T00:00:00`).getTime() : null;
		const result = todoStore.add(uid, text, category, dueDate);

		if (!result.valid) {
			logger.warn(`Todo rejected: ${result.error}`, SOURCE);
			error = result.error ?? 'Invalid task.';
			return;
		}

		logger.info(`Todo added: "${result.value}"`, SOURCE);
		error = '';
		text = '';
		due = '';
	}
</script>

<div class="space-y-2">
	<div class="flex gap-2">
		<input
			bind:value={text}
			onkeydown={(e) => e.key === 'Enter' && submit()}
			placeholder="Add a new task..."
			class="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder-slate-500 backdrop-blur-sm outline-none"
		/>
		<Button text="+" width="3rem" onclick={submit} />
	</div>

	<div class="flex gap-2">
		<select
			bind:value={category}
			class="flex-1 rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-slate-300 capitalize backdrop-blur-sm"
		>
			{#each CATEGORIES as c (c)}
				<option value={c} class="bg-slate-900">{c}</option>
			{/each}
		</select>

		<input
			type="date"
			bind:value={due}
			class="flex-1 rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-slate-300 backdrop-blur-sm"
		/>
	</div>

	{#if error}
		<p class="text-xs text-red-400">{error}</p>
	{/if}
</div>
