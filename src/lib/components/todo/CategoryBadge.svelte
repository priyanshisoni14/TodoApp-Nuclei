<script lang="ts">
	import { CATEGORY_COLOR, type Category } from '$lib/types';

	let { category }: { category: Category } = $props();
</script>

<span
	class="shrink-0 rounded-full px-3 py-1 text-xs font-semibold text-white capitalize {CATEGORY_COLOR[category]}"
>
	{category}
</span>