import { Task } from "@/types/task";

export const id = (a: Task, b: Task) => {
	if (a.id < b.id) {
		return -1;
	} else if (a.id > b.id) {
		return 1;
	}
	return 0;
}
