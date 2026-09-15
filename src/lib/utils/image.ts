const MAX_DIMENSION = 1280;

export async function compressImageToDataUrl(file: File, maxBytes = 300 * 1024): Promise<string> {
	const bitmap = await createImageBitmap(file);
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	if (!ctx) throw new Error('Canvas not supported.');

	const render = (width: number, height: number, quality: number) => {
		canvas.width = width;
		canvas.height = height;
		ctx.drawImage(bitmap, 0, 0, width, height);
		return canvas.toDataURL('image/jpeg', quality);
	};

	let width = bitmap.width;
	let height = bitmap.height;
	if (Math.max(width, height) > MAX_DIMENSION) {
		const scale = MAX_DIMENSION / Math.max(width, height);
		width = Math.round(width * scale);
		height = Math.round(height * scale);
	}

	let quality = 0.8;
	let dataUrl = render(width, height, quality);

	// Try cheaper compression (quality) before destructive resizing.
	while (dataUrl.length > maxBytes && quality > 0.3) {
		quality -= 0.1;
		dataUrl = render(width, height, quality);
	}

	// Quality alone wasn't enough — shrink dimensions as a last resort.
	while (dataUrl.length > maxBytes && width > 320) {
		width = Math.round(width * 0.85);
		height = Math.round(height * 0.85);
		dataUrl = render(width, height, quality);
	}

	if (dataUrl.length > maxBytes) {
		throw new Error('Could not compress this image enough — try a smaller photo.');
	}

	return dataUrl;
}