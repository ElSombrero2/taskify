import { ReactNode } from "react"
import { Task } from "../../../../../../types/task"
import { TaskCard } from "../Cards/Task/Task"

export const Column = ({children, tasks}: {children: ReactNode, tasks?: Task[]}) => {
  return (
    <div className="flex flex-col gap-4">
      {children}
      {tasks?.map((task, index) => (
        <TaskCard task={task} key={`${task.id}-${index}`} />
      ))}
    </div>
  )
}