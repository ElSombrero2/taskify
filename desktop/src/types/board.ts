import { GroupedTasks, Task } from "./task"

export type Board = {
  name: string,
  tasks: Task[],
  extra: unknown,
}

export type BoardTuple = [GroupedTasks, Board]