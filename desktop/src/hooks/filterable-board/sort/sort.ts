import { Task } from "@/types/task";
import { SortStrategy } from "./strategy";

export type Field = 'date' | 'username' | 'id' | 'priority' | 'title'

export const sort = (field: Field, order: 'ASC' | 'DESC') => {
	return (a: Task, b: Task) => {
		const strategy = SortStrategy[field];
		if (order === 'ASC') return strategy(b, a);
		return strategy(a, b);
	}
}


