import { onDestroy, onMount } from 'svelte';

type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

const LEVEL_ORDER: Record<LogLevel, number> = {
	DEBUG: 0,
	INFO: 1,
	WARN: 2,
	ERROR: 3
};

// Show everything in development, only warnings/errors in production.
const MIN_LEVEL: LogLevel = import.meta.env.DEV ? 'DEBUG' : 'WARN';

class Logger {
	private log(level: LogLevel, message: string, source?: string, error?: unknown) {
		// Drop anything below the configured minimum level.
		if (LEVEL_ORDER[level] < LEVEL_ORDER[MIN_LEVEL]) return;

		const time = new Date().toLocaleTimeString();
		const prefix = `%c[${time}] [${level}]${source ? ` [${source}]` : ''}`;

		switch (level) {
			case 'DEBUG':
				console.log(prefix, message);
				break;

			case 'INFO':
				console.info(prefix, message);
				break;

			case 'WARN':
				console.warn(prefix, message);
				break;

			case 'ERROR':
				console.error(prefix, message, error ?? '');
				break;
		}
	}

	debug(message: string, source?: string) {
		this.log('DEBUG', message, source);
	}

	info(message: string, source?: string) {
		this.log('INFO', message, source);
	}

	warn(message: string, source?: string) {
		this.log('WARN', message, source);
	}

	error(message: string, source?: string, error?: unknown) {
		this.log('ERROR', message, source, error);
	}
}

export const logger = new Logger();

/**
 * Logs mount/destroy for a component. Call it once at the top of a
 * component's <script> block: logLifecycle('TodoItem').
 * Must be called during component initialisation, not inside a handler.
 */
export function logLifecycle(source: string) {
	onMount(() => logger.debug('mounted', source));
	onDestroy(() => logger.debug('destroyed', source));
}
