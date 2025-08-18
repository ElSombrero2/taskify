import { Task } from "@/types/task";

export const filter = (tags: string[]) => {
	return (task: Task) => {
		let match = true;
		for (const tag of tags) {
			match = match && task.tags.includes(tag);
		}
		return !tags?.length || match;
	}
}
