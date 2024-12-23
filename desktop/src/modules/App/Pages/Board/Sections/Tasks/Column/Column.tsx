import { ReactNode } from "react"
import { Task, TaskState } from "@/types/task"
import { TaskCard } from "../Cards/Task/Task"
import { Droppable } from "../Cards/Task/Droppable/Droppable"

export const Column = ({children, tasks, state}: {children: ReactNode, tasks?: Task[], state: TaskState}) => {
  return (
    <div className="flex flex-col gap-6">
      {children}
      <div className="flex flex-col gap-2">
        {!tasks?.length && <Droppable
          onDrop={(id, target) => console.log(id, target)}
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