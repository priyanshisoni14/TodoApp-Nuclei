<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { loginWithGoogle } from '$lib/firebase/auth';
	import { authStore } from '$lib/stores/authStore.svelte';

	let signingIn = $state(false);
	let error = $state<string | null>(null);

	$effect(() => {
		if (authStore.isAuthenticated) goto(resolve('/todos'));
	});

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

<svelte:head>
	<title>Sign in | TodoApp</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-gradient-to-b from-violet-50 to-white px-6">
	<div class="w-full max-w-sm rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-xl shadow-violet-100">
		<div class="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500 text-xl font-bold text-white">
			✓
		</div>

		<h1 class="text-2xl font-semibold text-gray-900">TodoApp</h1>
		<p class="mt-2 text-sm text-gray-500">Sign in to see your todos.</p>

		<button
			onclick={handleSignIn}
			disabled={signingIn}
			class="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition hover:border-gray-300 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
		>
			{#if signingIn}
				<svg class="h-4 w-4 animate-spin text-gray-400" viewBox="0 0 24 24" fill="none">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
					<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
				</svg>
				Signing in…
			{:else}
				<svg class="h-5 w-5" viewBox="0 0 24 24">
					<path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.63h6.47c-.28 1.5-1.13 2.77-2.4 3.62v3h3.88c2.27-2.09 3.57-5.17 3.57-8.8z" />
					<path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.11C3.25 21.3 7.31 24 12 24z" />
					<path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.6H1.27A11.96 11.96 0 000 12c0 1.93.46 3.76 1.27 5.4l4-3.11z" />
					<path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.6l4 3.11C6.22 6.86 8.87 4.75 12 4.75z" />
				</svg>
				Continue with Google
			{/if}
		</button>

		{#if error}
			<p class="mt-4 text-sm text-red-600">{error}</p>
		{/if}
	</div>
</div>