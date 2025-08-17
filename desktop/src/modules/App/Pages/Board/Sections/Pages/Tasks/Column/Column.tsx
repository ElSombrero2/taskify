import { DragEvent, ReactNode, useState } from "react"
import { Task, TaskState } from "@/types/task"
import { TaskCard } from "../Cards/Task/Task"
import { useBoard } from "@/store/board/board"

type ColumnProps = {
  children: ReactNode;
  tasks?: Task[];
  state?: TaskState;
  onCardClicked?: (task: Task) => void;
}

export const Column = ({children, tasks, state, onCardClicked}: ColumnProps) => {
  const { updateTask, board } = useBoard();
	const [isDragOver, setIsDragOver] = useState(false);
	const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData('id');

    const task = board?.tasks.find((t) => t.id === id);
    if (task && state && task?.state !== state) {
      updateTask(id, task?.info.filename, task?.state, state as TaskState);
    }

		setIsDragOver(false);
  };

	const onDragEnter = () => {
		if (currentTask?.state !== state) {
			setIsDragOver(true);
		}
	}

	const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
		const target = e.target as HTMLDivElement;
		
		if (target.attributes.getNamedItem('data-droppable')) {
			setIsDragOver(false);
		}
	}
	
  return (
    <div
			data-droppable={state}
			className={`${isDragOver && 'bg-gray-600'} p-1 table-cell rounded-lg min-h-[calc(100vh-266px)]`}
			onDragEnter={onDragEnter}
			onDragOver={(e) => e.preventDefault()}
			onDrop={onDrop}
			onDragLeave={onDragLeave}
		>
			<div className="mb-6">
				{children}
			</div>
			<div className={`flex flex-col gap-3 ${isDragOver ? 'opacity-15' : ''}`}>
				{tasks?.map((task, index) => (
					<div
						className={`flex flex-col`}
						key={`${task.id}-${index}`}
					>
						<TaskCard
							onDragStart={setCurrentTask}
							onDragEnd={() => { setIsDragOver(false); setCurrentTask(null); }}
							onClick={onCardClicked}
							task={task}
						/>
					</div>
				))}	
			</div>
    </div>
  )
}
