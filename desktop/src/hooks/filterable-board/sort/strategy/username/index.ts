import { Task } from "@/types/task";

export const username = (a: Task, b: Task) => {
	const aUsername = (a.info.author?.name ?? 'unknown').toLowerCase();
	const bUsername = (b.info.author?.name ?? 'unknown').toLowerCase();
	
	if (aUsername < bUsername) {
		return -1;
	} else if (aUsername > bUsername) {
		return 1;
	}

	return 0;
}
