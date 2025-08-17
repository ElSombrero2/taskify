import { useBoard } from "@/store/board/board"
import { useFilter } from "@/store/filters/filters";
import { Board } from "@/types/board";
import { GroupedTasks, Task, TaskState } from "@/types/task";

export const useFilterableBoard = (): { board?: Board, tasks?: GroupedTasks } => {
	const { tags } = useFilter();
	const { tasks, board } = useBoard();
	
	return {
		board: board ? {
			...board,
			tasks: board?.tasks?.filter(filter(tags ?? [])) ?? [],
		} : undefined,
		tasks: filterGroupedTasks(tasks, tags),
	};
}

const filter = (tags: string[]) => {
	return (task: Task) => {
		let match = true;
		for (const tag of tags) {
			match = match && task.tags.includes(tag);
		}
		return !tags?.length || match;
	}
}

const filterGroupedTasks = (tasks?: GroupedTasks, tags?: string[]): GroupedTasks | undefined => {
	if (tasks) {
		const keys = Object.keys(tasks) as TaskState[];
		const filteredTasks: {[key: string]: Task[]} = {};
		for (const key of keys) {
			filteredTasks[key] = tasks[key].filter(filter(tags ?? []))
		}
		return filteredTasks as GroupedTasks;
	}
}
