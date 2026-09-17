// src/lib/firebase/config.ts
import { getApp, getApps, initializeApp } from 'firebase/app';
import {
	PUBLIC_FIREBASE_API_KEY,
	PUBLIC_FIREBASE_AUTH_DOMAIN,
	PUBLIC_FIREBASE_PROJECT_ID,
	PUBLIC_FIREBASE_STORAGE_BUCKET,
	PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	PUBLIC_FIREBASE_APP_ID
} from '$env/static/public';

const firebaseConfig = {
	apiKey: PUBLIC_FIREBASE_API_KEY,
	authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: PUBLIC_FIREBASE_APP_ID
};

// If an app is already initialized, getApp() will return the existing instance.
// If no app is initialized, initializeApp() will create a new instance.
export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);