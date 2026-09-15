import {
	addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot,
	orderBy, query, serverTimestamp, Timestamp, updateDoc, where
} from 'firebase/firestore';
import { firebaseApp } from './config';
import type { Todo } from '$lib/types';

export const db = getFirestore(firebaseApp);
const TODOS_COLLECTION = 'todos';

export function subscribeTodos(
	uid: string,
	onChange: (todos: Todo[]) => void,
	onError?: (err: Error) => void
) {
	const q = query(
		collection(db, TODOS_COLLECTION),
		where('uid', '==', uid),
		orderBy('createdAt', 'desc')
	);

	return onSnapshot(
		q,
		(snapshot) => {
			const todos: Todo[] = snapshot.docs.map((d) => {
				const data = d.data();
				return {
					id: d.id,
					uid: data.uid,
					text: data.text,
					completed: Boolean(data.completed),
					createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toMillis() : Date.now()
				};
			});
			onChange(todos);
		},
		(err) => onError?.(err)
	);
}

export async function addTodo(uid: string, text: string): Promise<void> {
	await addDoc(collection(db, TODOS_COLLECTION), {
		uid, text, completed: false, createdAt: serverTimestamp()
	});
}

export async function setTodoCompleted(id: string, completed: boolean): Promise<void> {
	await updateDoc(doc(db, TODOS_COLLECTION, id), { completed });
}

export async function deleteTodo(id: string): Promise<void> {
	await deleteDoc(doc(db, TODOS_COLLECTION, id));
}