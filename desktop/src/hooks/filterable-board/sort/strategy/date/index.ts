import { Task } from "@/types/task";

export const date = (a: Task, b: Task) => {
	const aDate = (a.info.date ?? 'unknown').toLowerCase();
	const bDate = (b.info.date ?? 'unknown').toLowerCase();
	
	if (aDate < bDate) {
		return -1;
	} else if (aDate > bDate) {
		return 1;
	}

	return 0;
}
