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