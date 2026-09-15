<script lang="ts">
	import Spinner from '$lib/components/ui/Spinner.svelte';
	import GoogleIcon from '$lib/components/ui/GoogleIcon.svelte';

	let { loading = false, onclick }: { loading?: boolean; onclick: () => void } = $props();
</script>

<button
	onclick={onclick}
	disabled={loading}
	class="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition hover:border-gray-300 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
>
	{#if loading}
		<Spinner class="h-4 w-4 text-gray-400" />
		Signing in…
	{:else}
		<GoogleIcon class="h-5 w-5" />
		Continue with Google
	{/if}
</button>