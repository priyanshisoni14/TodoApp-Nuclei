<script lang="ts">
	let {
		text,
		onclick,
		width = 'auto',
		height = 'auto',
		active = false,
		plain = false,
		ariaLabel,
		class: extraClass = ''
	}: {
		text: string;
		onclick: () => void;
		width?: string;
		height?: string;
		active?: boolean;
		plain?: boolean;
		ariaLabel?: string;
		class?: string;
	} = $props();

	function buttonClass() {
		if (plain) return `text-sm transition ${extraClass}`;

		const state = active
			? 'border-white/40 bg-slate-900/80 text-white'
			: 'border-white/10 bg-slate-900/60 text-slate-300 hover:bg-slate-900/80';

		return `rounded-lg border px-3 py-2 text-sm capitalize transition backdrop-blur-sm ${state} ${extraClass}`;
	}
</script>

<button
	{onclick}
	aria-label={ariaLabel ?? text}
	style="width: {width}; height: {height};"
	class={buttonClass()}
>
	{text}
</button>