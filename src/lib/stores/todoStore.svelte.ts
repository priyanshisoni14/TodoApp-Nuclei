import { addTodo, deleteTodo, setTodoCompleted, subscribeTodos } from '$lib/firebase/firestore';
import type { Category, Todo } from '$lib/types';
import { validateTodoText, type ValidationResult } from '$lib/utils/validation';
import { logger } from '$lib/utils/logger';
import { SvelteDate } from 'svelte/reactivity';

const startOfToday = () => new SvelteDate().setHours(0, 0, 0, 0);

class TodoStore {
	todos = $state<Todo[]>([]);
	loading = $state(true);
	category = $state<Category | 'all'>('all');
	date = $state<'all' | 'today' | 'upcoming' | 'overdue'>('all');

	// it stores a function that Firestore gives us for stopping the listener
	#stop: (() => void) | null = null;

	// Closes the current Firestore listener if one is open
	// to avoid memory leaks
	#stopListening() {
		if (!this.#stop) return;
		logger.debug('Unsubscribing from todos', 'TodoStore');
		this.#stop();
		this.#stop = null;
	}

	init(uid: string) {
		// Close any existing listener before starting a new one
		this.#stopListening();
		this.loading = true;
		logger.debug(`Subscribing to todos for uid=${uid}`, 'TodoStore');

		// Subscribe to todos for the given user ID and update the store whenever they change
		this.#stop = subscribeTodos(uid, (todos) => {
			this.todos = todos;
			this.loading = false;
		});
	}

	// Closes the Firestore listener when the store is destroyed
	// called automatically by Svelte when the component using this store is destroyed
	destroy() {
		this.#stopListening();
	}

	get filtered() {
		const today = startOfToday();
		return this.todos.filter((t) => {
			if (this.category !== 'all' && t.category !== this.category) return false;
			if (this.date === 'today')
				return t.dueDate !== null && t.dueDate >= today && t.dueDate < today + 86_400_000;
			if (this.date === 'upcoming') return t.dueDate !== null && t.dueDate >= today + 86_400_000;
			if (this.date === 'overdue') return t.dueDate !== null && t.dueDate < today && !t.completed;
			return true;
		});
	}

	get pending() {
		return this.filtered.filter((t) => !t.completed);
	}

	get done() {
		return this.filtered.filter((t) => t.completed);
	}

	clearFilters() {
		this.category = 'all';
		this.date = 'all';
	}

	// Adds a new todo for the given user ID after validating the text.
	// Returns a ValidationResult indicating whether the text was valid and, if not, what the error was.
	add(uid: string, text: string, category: Category, dueDate: number | null): ValidationResult {
		const result = validateTodoText(text);
		if (result.valid) {
			addTodo(uid, result.value, category, dueDate);
		}
		return result;
	}

	toggle(t: Todo) {
		return setTodoCompleted(t.id, !t.completed);
	}

	remove(id: string) {
		return deleteTodo(id);
	}
}

export const todoStore = new TodoStore();
