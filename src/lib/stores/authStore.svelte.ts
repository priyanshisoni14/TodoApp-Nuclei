import { browser } from '$app/environment';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '$lib/firebase/auth';

class AuthStore {
    user = $state<User | null>(null);
    loading = $state(true);

    constructor() {
        if (!browser) {
            this.loading = false;
            return;
        }

        onAuthStateChanged(auth, (user) => {
            this.user = user;
            this.loading = false;
        });
    }

    get isAuthenticated() {
        return this.user !== null;
    }
}

export const authStore = new AuthStore();