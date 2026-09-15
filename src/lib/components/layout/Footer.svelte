<script lang="ts">
	let { activeCount }: { activeCount: number } = $props();
</script>

<footer class="mx-auto max-w-6xl px-6 py-6 text-center text-xs text-gray-400">
	{activeCount} {activeCount === 1 ? 'task' : 'tasks'} left
</footer>