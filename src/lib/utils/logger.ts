type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

const LEVEL_ORDER: Record<LogLevel, number> = {
	DEBUG: 0,
	INFO: 1,
	WARN: 2,
	ERROR: 3
};

// Show all logs in development, only warnings/errors in production.
// This is determined by the `import.meta.env.DEV` variable,
// which is true in development and false in production.
const MIN_LEVEL: LogLevel = import.meta.env.DEV ? 'DEBUG' : 'WARN';

class Logger {
	private log(level: LogLevel, message: string, source?: string, error?: unknown) {
		// If the log level is below the minimum level, do not log anything
		// This ensures that in production, only warnings and errors are logged,
		// while in development, all logs are shown.
		if (LEVEL_ORDER[level] < LEVEL_ORDER[MIN_LEVEL]) {
			return;
		}

		const time = new Date().toISOString();

		const prefix = `[${time}] [${level}]${source ? ` [${source}]` : ''}`;

		switch (level) {
			case 'DEBUG':
				console.debug(prefix, message);
				break;

			case 'INFO':
				console.info(prefix, message);
				break;

			case 'WARN':
				console.warn(prefix, message);
				break;

			case 'ERROR':
				console.error(prefix, message, error);
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
