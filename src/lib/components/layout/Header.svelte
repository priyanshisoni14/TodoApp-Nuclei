<script lang="ts">
	import { logout } from '$lib/firebase/auth';
	import { authStore } from '$lib/stores/authStore.svelte';
	import Button from '$lib/components/ui/Button.svelte';
</script>

<header class="border-b border-gray-100 bg-white/70 backdrop-blur">
	<div class="mx-auto flex max-w-2xl items-center justify-between px-6 py-4">
		<div class="flex items-center gap-2.5">
			<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500 text-sm font-bold text-white">
				✓
			</div>
			<span class="text-lg font-semibold text-gray-900">TodoApp</span>
		</div>

		<div class="flex items-center gap-3">
			{#if authStore.user?.photoURL}
				<img src={authStore.user.photoURL} alt="" class="h-7 w-7 rounded-full ring-1 ring-gray-200" />
			{/if}
			<Button variant="ghost" onclick={logout}>Sign out</Button>
		</div>
	</div>
</header>