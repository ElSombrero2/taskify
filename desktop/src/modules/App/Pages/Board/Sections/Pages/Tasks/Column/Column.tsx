import { DragEvent, ReactNode, useState } from "react"
import { Task, TaskState } from "@/types/task"
import { TaskCard } from "../Cards/Task/Task"
import { useBoard } from "@/store/board/board"
import clsx from "clsx"

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

	const onDragOver = (e: DragEvent) => {
		e.preventDefault();
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
			data-droppable
			className={clsx(
				'table-cell min-h-[calc(100vh-266px)]',
				`border border-1 p-1 rounded-lg border-dashed transition-[border,background] duration-75`,
				{
					'bg-gray-600 bg-opacity-20 dark:bg-opacity-40 border-gray-600': isDragOver,
					'border-transparent': !isDragOver,
				},
			)}
			onDragOver={onDragOver}
			onDrop={onDrop}
			onDragLeaveCapture={onDragLeave}
		>
			<div className="mb-6 pointer-events-none">
				{children}
			</div>
			<div className={`flex flex-col gap-3 ${isDragOver ? 'hidden pointer-events-none' : ''}`}>
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
