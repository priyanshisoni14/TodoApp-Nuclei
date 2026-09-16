export interface Todo {
    id: string;
    uid: string;
    text: string;
    important: boolean;
    completed: boolean;
    category: string;
    createdAt: number;
}