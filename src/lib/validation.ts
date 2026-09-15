export const TODO_MAX_LENGTH = 250;

export interface ValidationResult {
	valid: boolean;
	error?: string;
	value: string; 
}

export function validateTodoText(raw: string): ValidationResult {
	const value = raw.trim();

	if (value.length === 0) {
		return { valid: false, error: 'Todo cannot be empty.', value };
	}

	if (value.length > TODO_MAX_LENGTH) {
		return {
			valid: false,
			error: `Todo must be ${TODO_MAX_LENGTH} characters or fewer (currently ${value.length}).`,
			value
		};
	}

	return { valid: true, value };
}

const MAX_MEDIA_BYTES = 5 * 1024 * 1024; // 5MB

export function validateTodoMedia(file: File): ValidationResult {
	const isImage = file.type.startsWith('image/');
	const isVideo = file.type.startsWith('video/');

	if (!isImage && !isVideo) {
		return { valid: false, error: 'Only image or video files are supported.', value: file.name };
	}

	if (file.size > MAX_MEDIA_BYTES) {
		return { valid: false, error: 'File must be 5MB or smaller.', value: file.name };
	}

	return { valid: true, value: file.name };
}