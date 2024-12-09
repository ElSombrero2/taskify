import { GroupedTasks, Task } from "./task"

export type Board = {
  name: string,
  tasks: Task[],
}

export type BoardTuple = [GroupedTasks, Board]