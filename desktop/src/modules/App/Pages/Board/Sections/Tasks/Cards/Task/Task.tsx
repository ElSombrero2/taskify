import { Task } from "@/types/task";
import { Card } from "@/ui/components/Cards/Card/Card";
import { Divider } from "@/ui/components/Separators/Divider/Divider";
import clsx from "clsx";
import React, { useState } from "react";
import { Tags } from "./Tags/Tags";
import { Info } from "./Info/Info";
import { Text } from "./Text/Text";
import './Task.scss';

export const TaskCard = ({ task }: { task: Task }) => {
  const [dragged, setDrag] = useState(false);
  const [over, setOver] = useState<'top' | 'down' | undefined>();
  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setDrag(true);
    e.dataTransfer.setData('id', task.id);
    e.dataTransfer.setData(`height:${(e.target as HTMLDivElement).clientHeight}px`, '')
  }

  return (
    <div className={clsx(
        'droppable-wrapper flex p-1 flex-col gap-2',
        over === 'top' && 'droppable-top',
        over === 'down' && 'droppable-down',
      )}
    >
      <Card
        onDragOverCapture={(e) => {
          const h = e.currentTarget.clientHeight;
          const y = e.pageY - e.currentTarget.offsetTop;
          if(h / 2 - y < 0) {
            setOver('down')
        }
        else if ((e.currentTarget.clientHeight)/2 - y > 0) {
            // setOver('top')
        }
        }}
        onDragLeave={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setOver(undefined);
          }
        }}
        draggable
        onDragStart={onDragStart}
        onDragEnd={() => setDrag(false)}
        className={clsx(
          "bg-gray-100 dark:bg-gray-800 dark:bg-opacity-60",
          "min-w-[320px] max-w-[320px] flex flex-col gap-3",
          "transition-all duration-100",
          dragged && "opacity-20"
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
    </div>
  );
};
