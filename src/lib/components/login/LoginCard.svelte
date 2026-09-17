<script lang="ts">
	import GoogleSignInButton from '$lib/components/ui/GoogleSignInButton.svelte';
	import { loginWithGoogle } from '$lib/firebase/auth';
	import Blue from '$lib/components/ui/characters/Blue.svelte';

	let signingIn = $state(false);
	let error = $state<string | null>(null);

	async function handleSignIn() {
		error = null;
		signingIn = true;
		try {
			await loginWithGoogle();
		} catch (err) {
			console.error('Google sign-in failed:', err);
			error = 'Sign-in failed. Please try again.';
		} finally {
			signingIn = false;
		}
	}
</script>

<div
	class="flex w-full max-w-[400px] flex-col items-center rounded-[20px] border border-white/10 bg-white/[0.03] px-8 py-10 text-center backdrop-blur-md"
>
	<div class="mb-2 flex items-center gap-2">
		<div class="h-8 w-8" aria-hidden="true">
			<Blue />
		</div>

		<span class="text-[1.75rem] font-extrabold text-white">TaskCrew</span>
	</div>

	<p class="text-[0.95rem] text-slate-400">Small tasks. Big missions.</p>

	<GoogleSignInButton loading={signingIn} onclick={handleSignIn} />
	{#if error}
		<p class="mt-4 text-sm text-red-600">{error}</p>
	{/if}
	<p class="mt-6 flex items-center gap-1.5 text-[0.85rem] text-slate-500">
		<svg
			class="text-slate-500"
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			aria-hidden="true"
		>
			<path
				d="M9 11l3 3L22 4"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
		Your tasks await...
	</p>
</div>
