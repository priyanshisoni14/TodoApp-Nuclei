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
	let due = $state('');
	let error = $state('');

	const today = new Date().toISOString().split('T')[0];

	function submit() {
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
			aria-label="Task (required)"
			class="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder-slate-500 backdrop-blur-sm outline-none focus:border-white/30"
		/>
		<Button text="+" width="3rem" onclick={submit} ariaLabel="Add task" />
	</div>

	<div class="flex gap-2">
		
		<div class="relative flex-1">
			<span class="absolute -top-1.5 left-2 bg-slate-950 px-1 text-xs text-red-400">category *</span>
			<select
				bind:value={category}
				aria-label="Category (required)"
				class="w-full rounded-lg border border-yellow-400/40 bg-slate-900/70 px-3 py-2 text-sm text-slate-300 capitalize backdrop-blur-sm"
			>
				{#each CATEGORIES as c (c)}
					<option value={c} class="bg-slate-900">{c}</option>
				{/each}
			</select>
		</div>

		<div class="relative flex-1">
			<span class="absolute -top-1.5 left-2 bg-slate-950 px-1 text-xs text-slate-500">due date</span>
			<input
				type="date"
				bind:value={due}
				min={today}
				aria-label="Due date (optional)"
				class="w-full rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-slate-300 backdrop-blur-sm
					{due ? 'border-amber-400/40' : 'border-white/10'}"
			/>
		</div>
	</div>

	{#if error}
		<p class="text-xs text-red-400">{error}</p>
	{/if}
</div>