<script lang="ts">
	let { size = 'md' }: { size?: 'sm' | 'md' | 'lg' } = $props();

	const sizes = {
		sm: 'h-8 w-8 rounded-lg text-sm',
		md: 'h-10 w-10 rounded-xl text-base',
		lg: 'h-12 w-12 rounded-2xl text-xl'
	};
</script>

<div class="flex items-center justify-center bg-violet-500 font-bold text-white {sizes[size]}">
	✓
</div>