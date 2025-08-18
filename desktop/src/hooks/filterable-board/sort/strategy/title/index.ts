import { Task } from "@/types/task";

export const title = (a: Task, b: Task) => {
	if (a.title < b.title) {
		return -1;
	} else if (a.title > b.title) {
		return 1;
	}
	return 0;
}
