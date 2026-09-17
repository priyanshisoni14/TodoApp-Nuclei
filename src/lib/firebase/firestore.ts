import {
	addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot,
	orderBy, query, serverTimestamp, Timestamp, updateDoc, where
} from 'firebase/firestore';
import { firebaseApp } from './config';
import type { Category, Todo } from '../types';

export const db = getFirestore(firebaseApp);
const COL = 'todos';

// Subscribe to todos for a specific user and call onChange whenever the data changes
export function subscribeTodos(uid: string, onChange: (todos: Todo[]) => void) {
	// Create a query to get todos for the specific user
	const q = query(collection(db, COL), where('uid', '==', uid), orderBy('createdAt', 'desc'));
// Listen for real-time updates to the query and call onChange with the updated todos   
	return onSnapshot(q, (snap) => {
		onChange(
			snap.docs.map((d) => {
				const x = d.data();
				return {
					id: d.id,
					uid: x.uid,
					text: x.text,
					completed: Boolean(x.completed),
					category: (x.category ?? 'personal') as Category,
					dueDate: typeof x.dueDate === 'number' ? x.dueDate : null,
					createdAt: x.createdAt instanceof Timestamp ? x.createdAt.toMillis() : Date.now()
				};
			})
		);
	});
}

export function addTodo(uid: string, text: string, category: Category, dueDate: number | null) {
	return addDoc(collection(db, COL), {
		uid, text, category, dueDate, completed: false, createdAt: serverTimestamp()
	});
}

export function setTodoCompleted(id: string, completed: boolean) {
	return updateDoc(doc(db, COL, id), { completed });
}

export function deleteTodo(id: string) {
	return deleteDoc(doc(db, COL, id));
}