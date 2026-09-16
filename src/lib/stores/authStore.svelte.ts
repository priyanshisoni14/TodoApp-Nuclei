import { browser } from '$app/environment';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '$lib/firebase/auth';

class AuthStore {
    user = $state<User | null>(null);
    loading = $state(true);

    constructor() {
    // If not in a browser environment, set loading to false and return early
        if (!browser) {
            this.loading = false;
            return;
        }
  //runs everytime auth state changes whenever user logs in or logs out, 
  // it sets the user and loading state accordingly
        onAuthStateChanged(auth, (user) => {
            console.log('Auth state changed:', user);
            this.user = user;
            this.loading = false;
        });
    }

    get isAuthenticated() {
        return this.user !== null;
    }
}

export const authStore = new AuthStore();