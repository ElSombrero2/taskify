import { Task, TaskState } from "@/types/task";
import { Card } from "@/ui/components/Cards/Card/Card";
import { Divider } from "@/ui/components/Separators/Divider/Divider";
import clsx from "clsx";
import React, { useState } from "react";
import { Info } from "./Info/Info";
import { Text } from "./Text/Text";
import { useTags } from "@/hooks/tag";

type TaskCardProps =  { 
	className?: string,
	task: Task,
	onClick?: (task: Task) => void,
}

export const TaskCard = ({ task, onClick, className, }: TaskCardProps) => {
  const [dragged, setDragged] = useState(false);
  const { type } = useTags(task?.tags);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setDragged(true);
    e.dataTransfer.setData(`height:${(e.target as HTMLDivElement).clientHeight}`, '')
    e.dataTransfer.setData('id', task.id);
    e.dataTransfer.setData('state', task.state);
  }

	const onDragEnd = () => setDragged(false)

  return (
    <div className="flex flex-col">
			<button className={`text-left block ${className}`} onClick={() => onClick && onClick(task)}>
				<Card
					draggable
					onDragStart={onDragStart}
					onDragEnd={onDragEnd}
					className={clsx(
						"border-0 border-l-4",
						type?.border,
						"card bg-gray-100 dark:bg-gray-800 dark:bg-opacity-60 cursor-pointer",
						"min-w-[320px] max-w-[320px] flex flex-col gap-3",
						"transition-all duration-100",
						'hover:bg-gray-200 hover:dark:bg-gray-800 hover:dark:bg-opacity-100 ',
						'active:bg-gray-300 active:dark:bg-gray-800 active:dark:bg-opacity-60',
						dragged && 'opacity-20',
					)}
				>
					<Text
						title={task.title}
						description={task.description}
						tags={task.tags}
					/>
					<Divider />
					<Info info={task.info} />
				</Card>
			</button>
    </div>
  );
};
