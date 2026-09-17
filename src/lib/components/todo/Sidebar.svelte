<script lang="ts">
	import { todoStore } from '$lib/stores/todoStore.svelte';
	import { CATEGORIES, type Category } from '$lib/types';
	import { logger, logLifecycle } from '$lib/utils/logger';
	import Button from '$lib/components/ui/Button.svelte';
	import AddTaskForm from './AddTaskForm.svelte';
	import FilterGroup from './FilterGroup.svelte';

	let { uid }: { uid: string } = $props();

	const SOURCE = 'Sidebar';
	logLifecycle(SOURCE);

	function clear() {
		logger.debug('Clearing all filters', SOURCE);
		todoStore.clearFilters();
	}
</script>

<aside class="w-full space-y-6 rounded-3xl border border-white/5 bg-white/2 p-6 lg:max-w-sm">
	<AddTaskForm {uid} />

	<FilterGroup
		label="Category"
		options={['all', ...CATEGORIES]}
		selected={todoStore.category}
		onselect={(v) => (todoStore.category = v as Category | 'all')}
		source="CategoryFilter"
	/>

	<FilterGroup
		label="Date"
		options={['all', 'today', 'upcoming','overdue']}
		selected={todoStore.date}
		onselect={(v) => (todoStore.date = v as 'all' | 'today' | 'upcoming')}
		source="DateFilter"
	/>

	<Button text="Clear filters" width="100%" onclick={clear} />
</aside>