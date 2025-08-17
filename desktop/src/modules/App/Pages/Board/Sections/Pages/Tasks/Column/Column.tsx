import { ReactNode, useState } from "react"
import { Task, TaskState } from "@/types/task"
import { TaskCard } from "../Cards/Task/Task"
import { useBoard } from "@/store/board/board"

type ColumnProps = {
  children: ReactNode;
  tasks?: Task[];
  state?: TaskState;
  onCardClicked?: (task: Task) => void;
}

export const Column = ({children, tasks, onCardClicked}: ColumnProps) => {
  const { updateTask, board } = useBoard();
	const [isDragOver, setIsDragOver] = useState(false);

  /*const onDrop = (e) => {
    const task = board?.tasks.find((t) => t.id === id);
    if (task) {
      updateTask(id, task?.info.filename, task?.state, target as TaskState);
    }
  };*/
	
  return (
    <div
			data-droppable
			className={`flex ${isDragOver && 'bg-gray-600'} flex-col gap-6 p-1 table-cell rounded-lg min-h-[calc(100vh-266px)]`}
			onDragEnterCapture={() => setIsDragOver(true)}
			onDrop={() => { console.log('Drop', e)}}
			onDragLeaveCapture={(e) => (e.target as HTMLDivElement).attributes.getNamedItem('data-droppable')?.value && setIsDragOver(false) }
		>
			{children}
      <div className={`flex flex-col gap-2 ${isDragOver ? 'hidden' : ''}`}>
				{tasks?.map((task, index) => (
					<div
						className={`flex flex-col`}
						key={`${task.id}-${index}`}
					>
						<TaskCard
							onClick={onCardClicked}
							task={task}
						/>
					</div>
				))}	
			</div>
    </div>
  )
}
