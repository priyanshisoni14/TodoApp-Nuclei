import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signOut
} from 'firebase/auth';

import { firebaseApp } from './config';

export const auth = getAuth(firebaseApp);

const googleProvider = new GoogleAuthProvider();

export async function loginWithGoogle() {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
}

export async function logout() {
    await signOut(auth);
}