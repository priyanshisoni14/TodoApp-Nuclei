import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '$lib/firebase/auth';
import { logger } from '$lib/utils/logger';

class AuthStore {
	// storing my user
	user = $state<User | null>(null);
	loading = $state(true);
	//This stores a function that Firebase gives us for stopping the listener
	private unsubscribe: (() => void) | null = null;

	init() {
		// so only one listener exists
		if (this.unsubscribe) return;

		logger.debug(`Initializing AuthStore`, 'AuthStore');

		this.unsubscribe = onAuthStateChanged(auth, (user) => {
			logger.debug(`Auth state changed: ${user}`, 'AuthStore');

			this.user = user;
			this.loading = false;
		});
	}

	get isAuthenticated() {
		return this.user !== null;
	}
}

export const authStore = new AuthStore();
