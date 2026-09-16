<script lang="ts">
	import Blue from './Blue.svelte';
	import Red from './Red.svelte';
	import Cyan from './Cyan.svelte';
	import Yellow from './Yellow.svelte';
	import Green from './Green.svelte';
	import White from './White.svelte';
	import Pink from './Pink.svelte';

	const characters = [
		{ id: 'blue', component: Blue, left: '8%', top: '15%', size: '45px', duration: '7s', delay: '0s' },
		{ id: 'white', component: White, left: '18%', top: '70%', size: '55px', duration: '9s', delay: '1s' },
		{ id: 'cyan', component: Cyan, left: '75%', top: '12%', size: '42px', duration: '6s', delay: '2s' },
		{ id: 'yellow', component: Yellow, left: '88%', top: '60%', size: '50px', duration: '8s', delay: '0.5s' },
		{ id: 'green', component: Green, left: '65%', top: '80%', size: '40px', duration: '7.5s', delay: '3s' },
		{ id: 'red', component: Red, left: '35%', top: '8%', size: '38px', duration: '6.5s', delay: '1.5s' },
		{ id: 'pink', component: Pink, left: '45%', top: '85%', size: '48px', duration: '8.5s', delay: '2.5s' }
	];
</script>

<div class="pointer-events-none fixed inset-0 z-0 overflow-hidden">
	{#each characters as character (character.id)}
		<div
			class="absolute floating-character"
			style="
				left: {character.left};
				top: {character.top};
				width: {character.size};
				animation-duration: {character.duration};
				animation-delay: {character.delay};
			"
		>
			<character.component />
		</div>
	{/each}
</div>

<style>
	.floating-character {
		animation-name: float;
		animation-timing-function: ease-in-out;
		animation-iteration-count: infinite;
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0) rotate(-4deg);
		}

		50% {
			transform: translateY(-30px) rotate(4deg);
		}
	}
</style>