export const CATEGORIES = ['work', 'study', 'health', 'personal', 'chores', 'leisure'] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_COLOR: Record<Category, string> = {
	work: 'bg-violet-500',
	study: 'bg-pink-500',
	health: 'bg-emerald-500',
	personal: 'bg-amber-500',
	chores: 'bg-red-500',
	leisure: 'bg-sky-500'
};

export interface Todo {
	id: string;
	uid: string;
	text: string;
	completed: boolean;
	category: Category;
	dueDate: number | null;
	createdAt: number;
}