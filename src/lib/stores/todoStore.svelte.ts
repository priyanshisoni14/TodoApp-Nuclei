import { addTodo, deleteTodo, setTodoCompleted, subscribeTodos } from '$lib/firebase/firestore';
import type { Category, Todo } from '$lib/types';
import { validateTodoText, type ValidationResult } from '$lib/utils/validation';
import { SvelteDate } from 'svelte/reactivity';
import { logger } from '$lib/utils/logger';

const startOfToday = () => new SvelteDate().setHours(0, 0, 0, 0);

class TodoStore {
	todos = $state<Todo[]>([]);
	loading = $state(true);
	category = $state<Category | 'all'>('all');
	date = $state<'all' | 'today' | 'upcoming'>('all');

	#stop: (() => void) | null = null;

	init(uid: string) {
		this.#stop?.();
		this.loading = true;
        logger.debug(`Subscribing to todos for uid=${uid}`, 'TodoStore');

		this.#stop = subscribeTodos(uid, (todos) => {
			this.todos = todos;
			this.loading = false;
		});
	}

	destroy() {
        logger.debug('Unsubscribing', 'TodoStore');
		this.#stop?.();
		this.#stop = null;
	}

	get filtered() {
		const today = startOfToday();
		return this.todos.filter((t) => {
			if (this.category !== 'all' && t.category !== this.category) return false;
			if (this.date === 'today') return t.dueDate !== null && t.dueDate >= today && t.dueDate < today + 86400000;
			if (this.date === 'upcoming') return t.dueDate !== null && t.dueDate >= today + 86400000;
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

	// Validates synchronously so the UI can show an error instantly;
	// the Firestore write fires in the background.
	add(uid: string, text: string, category: Category, dueDate: number | null): ValidationResult {
		const result = validateTodoText(text);
		if (result.valid) void addTodo(uid, result.value, category, dueDate);
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