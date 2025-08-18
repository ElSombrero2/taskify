import { useBoard } from "@/store/board/board"
import { useFilter } from "@/store/filters/filters";
import { Board } from "@/types/board";
import { GroupedTasks, Task, TaskState } from "@/types/task";
import { filter } from "./filter/filter";
import { Field, sort } from "./sort/sort";

export const useFilterableBoard = (): { board?: Board, tasks?: GroupedTasks } => {
	const { tags, field, order } = useFilter();
	const { tasks, board } = useBoard();

	return {
		board: board ? {
			...board,
			tasks: (board?.tasks?.filter(filter(tags ?? [])) ?? [])
			.sort(sort(field as unknown as Field, order)),
		} : undefined,
		tasks: filterAndSortGroupedTasks(tasks, tags, field as unknown as Field, order),
	};
}

const filterAndSortGroupedTasks = (tasks?: GroupedTasks, tags?: string[], field?: Field, order?: 'ASC' | 'DESC'): GroupedTasks | undefined => {
	if (tasks) {
		const keys = Object.keys(tasks) as TaskState[];
		const filteredTasks: {[key: string]: Task[]} = {};
		for (const key of keys) {
			filteredTasks[key] = tasks[key].filter(filter(tags ?? []))
			.sort(sort(field ?? 'date', order ?? 'ASC'))
		}
		return filteredTasks as GroupedTasks;
	}
}
