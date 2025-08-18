import { Task } from "@/types/task";
import { findLevelAndType, PriorityLevels } from "@/utils/find-level-and-type"

export const priority = (a: Task, b: Task) => {
	const priorities = PriorityLevels();
	const { priority: aPriority } = findLevelAndType(a.tags);
	const { priority: bPriority } = findLevelAndType(b.tags);
	
	const aIndex = priorities.findIndex((p) => p.key === aPriority?.key);
	const bIndex = priorities.findIndex((p) => p.key === bPriority?.key);
	
	return aIndex - bIndex;
}
