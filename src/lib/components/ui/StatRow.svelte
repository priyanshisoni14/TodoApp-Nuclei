<script lang="ts">
	let {
		icon: Icon,
		label,
		value,
		tone = 'muted'
	}: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		icon: any;
		label: string;
		value: number;
		tone?: 'accent' | 'muted';
	} = $props();

	const tones = {
		accent: { bg: 'bg-violet-50', icon: 'text-violet-500' },
		muted: { bg: 'bg-gray-50', icon: 'text-gray-400' }
	};
</script>

<div class="flex items-center justify-between rounded-xl px-3 py-2 {tones[tone].bg}">
	<span class="flex items-center gap-2 text-sm text-gray-600">
		<Icon class="h-4 w-4 {tones[tone].icon}" /> {label}
	</span>
	<span class="text-sm font-semibold text-gray-900">{value}</span>
</div>