import { ReactNode } from "react"
import { Task, TaskState } from "@/types/task"
import { TaskCard } from "../Cards/Task/Task"
import { Droppable } from "../Cards/Task/Droppable/Droppable"
import { useBoard } from "@/store/board/board"

export const Column = ({children, tasks, state}: {children: ReactNode, tasks?: Task[], state: TaskState}) => {
  const { updateTask, board } = useBoard();

  const onDrop = (id: string, target: string) => {
    const task = board?.tasks.find((t) => t.id === id);
    if (task) {
      updateTask(id, task?.info.filename, task?.state, target as TaskState);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {children}
      <div className="flex flex-col gap-2">
        {!tasks?.length && <Droppable
          offsetSize="1.25rem"
          onDrop={onDrop}
          target={state}
          className="h-20"
          activatedClassName="pb-5"
        />}
        {tasks?.map((task, index) => (
          <div className="flex flex-col" key={`${task.id}-${index}`}>
            <TaskCard top={index === 0} task={task} />
          </div>
        ))}
      </div>
    </div>
  )
}