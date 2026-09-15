<script lang="ts">
	let { class: className = 'h-4 w-4' }: { class?: string } = $props();
</script>

<div class="animate-spin rounded-full border-2 border-current border-t-transparent {className}"></div>