import { Task, TaskState } from "@/types/task";
import { Card } from "@/ui/components/Cards/Card/Card";
import { Divider } from "@/ui/components/Separators/Divider/Divider";
import clsx from "clsx";
import React, { useState } from "react";
import { Tags } from "./Tags/Tags";
import { Info } from "./Info/Info";
import { Text } from "./Text/Text";
import { Droppable } from "./Droppable/Droppable";
import { useBoard } from "@/store/board/board";

export const TaskCard = ({ task, top }: { task: Task, top?: boolean }) => {
  const [dragged, setDragged] = useState(false);
  const { board, updateTask } = useBoard();

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setDragged(true);
    e.dataTransfer.setData(`height:${(e.target as HTMLDivElement).clientHeight}`, '')
    e.dataTransfer.setData('id', task.id);
    e.dataTransfer.setData('state', task.state);
  }

  const onDrop = (id: string, target: string) => {
    const task = board?.tasks.find((t) => t.id === id);
    if (task) {
      updateTask(id, task?.info.filename, task?.state, target as TaskState);
    }
  };

  return (
    <div className="flex flex-col">
      {top && <Droppable
        onDrop={onDrop}
        offsetSize="1.5rem"
        target={task.state}
        className="h-5 -mt-5"
        activatedClassName="pb-5"
      />}
      <Card
        draggable
        onDragStart={onDragStart}
        onDragEnd={() => setDragged(false)}
        className={clsx(
          "card bg-gray-100 dark:bg-gray-800 dark:bg-opacity-60",
          "min-w-[320px] max-w-[320px] flex flex-col gap-3",
          "transition-all duration-100",
          dragged && 'opacity-20',
        )}
      >
        <Tags tags={task.tags} />
        <Text
          title={task.title}
          description={task.description}
        />
        <Divider />
        <Info info={task.info} />
      </Card>
      {<Droppable
        offsetSize="2rem"
        onDrop={onDrop}
        target={task.state}
        disabled={dragged}
        className="h-3"
        activatedClassName="py-3 pt-5"
      />}
    </div>
  );
};
