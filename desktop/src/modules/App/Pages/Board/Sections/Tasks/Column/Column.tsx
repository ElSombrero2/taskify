import { ReactNode } from "react"
import { Task } from "@/types/task"
import { TaskCard } from "../Cards/Task/Task"

export const Column = ({children, tasks}: {children: ReactNode, tasks?: Task[]}) => {
  return (
    <div className="flex flex-col gap-6">
      {children}
      <div className="flex flex-col gap-2">
        {tasks?.map((task, index) => (
          <div className="flex flex-col" key={`${task.id}-${index}`}>
            <TaskCard top={index === 0} task={task} />
          </div>
        ))}
      </div>
    </div>
  )
}