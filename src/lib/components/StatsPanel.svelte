<script lang="ts">
	import { ListTodo, CheckCircle2, Sparkles } from '@lucide/svelte';
	import GlassCard from './ui/GlassCard.svelte';
	import StatRow from './ui/StatRow.svelte';

	let { done, total }: { done: number; total: number } = $props();

	let active = $derived(total - done);
	let percent = $derived(total === 0 ? 0 : Math.round((done / total) * 100));

	const radius = 42;
	const circumference = 2 * Math.PI * radius;
	let offset = $derived(circumference - (percent / 100) * circumference);

	let greeting = $derived.by(() => {
		const hour = new Date().getHours();
		if (hour < 12) return 'Good morning';
		if (hour < 18) return 'Good afternoon';
		return 'Good evening';
	});

	const today = new Date().toLocaleDateString(undefined, {
		weekday: 'long',
		month: 'long',
		day: 'numeric'
	});
</script>

<div class="flex flex-col gap-6 lg:sticky lg:top-10">
	<div>
		<p class="text-sm font-medium text-violet-500">{greeting}</p>
		<h1 class="mt-1 text-3xl font-bold tracking-tight text-gray-900">Today's todos</h1>
		<p class="mt-1 text-sm text-gray-400">{today}</p>
	</div>

	<GlassCard>
		<div class="flex items-center gap-5">
			<div class="relative h-24 w-24 shrink-0">
				<svg viewBox="0 0 96 96" class="h-24 w-24 -rotate-90">
					<circle cx="48" cy="48" r={radius} fill="none" stroke="currentColor" stroke-width="8" class="text-gray-100" />
					<circle
						cx="48"
						cy="48"
						r={radius}
						fill="none"
						stroke="currentColor"
						stroke-width="8"
						stroke-linecap="round"
						class="text-violet-500 transition-all duration-500 ease-out"
						stroke-dasharray={circumference}
						stroke-dashoffset={offset}
					/>
				</svg>
				<div class="absolute inset-0 flex items-center justify-center">
					<span class="text-xl font-bold text-gray-900">{percent}%</span>
				</div>
			</div>

			<div class="flex flex-1 flex-col gap-2.5">
				<StatRow icon={ListTodo} label="Active" value={active} tone="accent" />
				<StatRow icon={CheckCircle2} label="Done" value={done} tone="muted" />
			</div>
		</div>

		{#if total > 0 && percent === 100}
			<p class="mt-4 flex items-center gap-1.5 text-sm font-medium text-violet-600">
				<Sparkles class="h-4 w-4" /> All done for today!
			</p>
		{/if}
	</GlassCard>
</div>