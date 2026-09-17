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

// Colors per level so logs are scannable in the console.
const LEVEL_STYLE: Record<LogLevel, string> = {
	DEBUG: 'color:#e2e8f0',
	INFO: 'color:#22d3ee',
	WARN: 'color:#fde047',
	ERROR: 'color:#ff4d6d'
};

class Logger {
	private log(level: LogLevel, message: string, source?: string, error?: unknown) {
		// Drop anything below the configured minimum level.
		if (LEVEL_ORDER[level] < LEVEL_ORDER[MIN_LEVEL]) return;

		// Time only (not full ISO) — the date is noise in a console.
		const time = new Date().toLocaleTimeString();
		const prefix = `%c[${time}] [${level}]${source ? ` [${source}]` : ''}`;
		const style = LEVEL_STYLE[level];

		switch (level) {
			case 'DEBUG':
				// console.log, NOT console.debug — console.debug is "Verbose" in
				// Chrome DevTools and is hidden by the default level filter.
				console.log(prefix, style, message);
				break;

			case 'INFO':
				console.info(prefix, style, message);
				break;

			case 'WARN':
				console.warn(prefix, style, message);
				break;

			case 'ERROR':
				console.error(prefix, style, message, error ?? '');
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