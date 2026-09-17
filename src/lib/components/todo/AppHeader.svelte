<script lang="ts">
	import { logout } from '$lib/firebase/auth';
	import { logger } from '$lib/utils/logger';
	import Button from '../ui/Button.svelte';

	let { name }: { name: string } = $props();

	const SOURCE = 'AppHeader';

	async function signOut() {
		logger.info('Sign out requested', SOURCE);
		try {
			await logout();
		} catch (err) {
			logger.error('Sign out failed', SOURCE, err);
		}
	}
</script>

<header class="mb-10 space-y-8">
	<div class="flex items-center justify-between">
		<span class="text-xl font-bold text-white">TaskCrew</span>
		<Button text="Sign out" onclick={signOut} plain class="text-slate-400 hover:text-white" />
	</div>

	<div>
		<h1 class="text-3xl font-bold text-white sm:text-4xl">Hello, {name}!</h1>
		<p class="mt-1 text-slate-400">Small steps. Big missions.</p>
	</div>
</header>
