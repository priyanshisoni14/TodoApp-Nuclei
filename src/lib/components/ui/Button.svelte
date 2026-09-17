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

	const classes = $derived(
		plain
			? `text-sm transition ${extraClass}`
			: `rounded-lg border px-3 py-2 text-sm capitalize transition ${
					active
						? 'border-white/40 bg-white/10 text-white'
						: 'border-white/10 text-slate-300 hover:bg-white/5'
				} ${extraClass}`
	);
</script>

<button {onclick} aria-label={ariaLabel ?? text} style="width: {width}; height: {height};" class={classes}>
	{text}
</button>