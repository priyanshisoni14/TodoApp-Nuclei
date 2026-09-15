<script lang="ts">
	import { Paperclip, X } from '@lucide/svelte';
	import IconButton from './ui/IconButton.svelte';
	import { compressImageToDataUrl } from '$lib/utils/image';

	let { onAttach }: { onAttach: (image: string | null) => void } = $props();

	let preview = $state<string | null>(null);
	let processing = $state(false);
	let error = $state<string | null>(null);

	async function handleFile(e: Event) {
		const file = (e.target as HTMLInputElement).files?.[0];
		if (!file) return;

		if (!file.type.startsWith('image/')) {
			error = 'Only image files are supported.';
			return;
		}

		error = null;
		processing = true;
		try {
			const dataUrl = await compressImageToDataUrl(file);
			preview = dataUrl;
			onAttach(dataUrl);
		} catch (err) {
			error = err instanceof Error ? err.message : 'Could not process image.';
			preview = null;
			onAttach(null);
		} finally {
			processing = false;
		}
	}

	function clear() {
		preview = null;
		error = null;
		onAttach(null);
	}
</script>

<div class="flex items-center gap-2">
	{#if preview}
		<div class="group relative">
			<img src={preview} alt="Attachment preview" class="h-10 w-10 rounded-lg object-cover ring-1 ring-black/5" />
			<div class="absolute -right-1.5 -top-1.5 rounded-full bg-gray-900 text-white">
				<IconButton label="Remove attachment" fadeOnHover onclick={clear}>
					<X class="h-3 w-3" />
				</IconButton>
			</div>
		</div>
	{:else}
		<label class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-dashed border-gray-300 text-gray-400 transition hover:border-violet-400 hover:text-violet-500">
			<Paperclip class="h-4 w-4" />
			<input type="file" accept="image/*" class="hidden" onchange={handleFile} />
		</label>
	{/if}

	{#if processing}<span class="text-xs text-gray-400">Processing…</span>{/if}
	{#if error}<span class="text-xs text-red-500">{error}</span>{/if}
</div>