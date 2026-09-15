// src/lib/types.ts
export type TodoMediaType = 'image' | 'video';

export interface Todo {
	id: string;
	uid: string;
	text: string;
	completed: boolean;
	createdAt: number;
	mediaUrl?: string;
	mediaType?: TodoMediaType;
}