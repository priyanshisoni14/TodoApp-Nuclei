import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { firebaseApp } from './config';
import { validateTodoMedia } from '$lib/validation';
import type { TodoMediaType } from '$lib/types';

export const storage = getStorage(firebaseApp);

export interface UploadedMedia {
	url: string;
	type: TodoMediaType;
}

export async function uploadTodoMedia(uid: string, file: File): Promise<UploadedMedia> {
	const check = validateTodoMedia(file);
	if (!check.valid) throw new Error(check.error);

	const type: TodoMediaType = file.type.startsWith('video/') ? 'video' : 'image';
	const path = `todos/${uid}/${crypto.randomUUID()}-${file.name}`;

	const snapshot = await uploadBytes(ref(storage, path), file);
	const url = await getDownloadURL(snapshot.ref);

	return { url, type };
}