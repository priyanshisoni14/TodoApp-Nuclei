<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { loginWithGoogle } from '$lib/firebase/auth';
	import { authStore } from '$lib/stores/authStore.svelte';
	import PageBackground from '$lib/components/layout/PageBackground.svelte';
	import Logo from '$lib/components/ui/Logo.svelte';
	import Spinner from '$lib/components/ui/Spinner.svelte';
	import GoogleIcon from '$lib/components/ui/GoogleIcon.svelte';

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

<PageBackground blobs>
	<div class="flex min-h-screen items-center justify-center px-6">
		<div
			class="w-full max-w-sm rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-xl shadow-violet-100"
		>
			<div class="mb-5 flex justify-center">
				<Logo size="lg" />
			</div>

			<h1 class="text-2xl font-semibold text-gray-900">TodoApp</h1>
			<p class="mt-2 text-sm text-gray-500">Sign in to see your todos.</p>

			<button
				onclick={handleSignIn}
				disabled={signingIn}
				class="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition hover:border-gray-300 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
			>
				{#if signingIn}
					<Spinner class="h-4 w-4 text-gray-400" />
					Signing in…
				{:else}
					<GoogleIcon class="h-5 w-5" />
					Continue with Google
				{/if}
			</button>

			{#if error}
				<p class="mt-4 text-sm text-red-600">{error}</p>
			{/if}
		</div>
	</div>
</PageBackground>
