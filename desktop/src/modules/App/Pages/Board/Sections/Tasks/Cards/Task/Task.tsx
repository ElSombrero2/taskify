import { Task } from "@/types/task";
import { Card } from "@/ui/components/Cards/Card/Card";
import { Divider } from "@/ui/components/Separators/Divider/Divider";
import clsx from "clsx";
import React, { DragEvent, useState } from "react";
import { Tags } from "./Tags/Tags";
import { Info } from "./Info/Info";
import { Text } from "./Text/Text";
import './Task.scss';

// TODO Find another way to manage these droppable
const Droppable = ({dragged, top}: {dragged?: boolean, top?: boolean}) => {
  const [entered, setEntered] = useState(false);
  const [height, setHeight] = useState('5px');

  const onEnter = (e: DragEvent<HTMLDivElement>) => {
    !dragged && setEntered(true);
    const height = parseInt(e.dataTransfer.types[0].split(':')[1]);
    setHeight(`calc(${height}px + 2rem)`);
  }
  
  return (
    <div
      onDragEnterCapture={onEnter}
      onDragLeaveCapture={() => setEntered(false)}
      style={{height: (entered && height) || undefined}}
      className={clsx(
        'transition-[height,opacity,padding,margin,transform] duration-300',
        !entered && 'h-5 overflow-hidden -my-2 -mb-4 opacity-0',
        entered && `opacity-100`,
        !top && entered && 'pt-2 pb-3',
        entered && top && 'translate-y-3 mb-4',
      )}
    >
      <div className={clsx(
        'border border-dashed border-white bg-gray-800',
        'pointer-events-none flex justify-center items-center',
        'rounded-lg h-full',
      )}>
        Drop Here
      </div>
    </div>
  )
}

/*
  [TODO]: Find the structure of the cards
*/
export const TaskCard = ({ task, top }: { task: Task, top?: boolean }) => {
  const [dragged, setDrag] = useState(false);
  
  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setDrag(true);
    e.dataTransfer.setData(`height:${(e.target as HTMLDivElement).clientHeight}`, '')
    e.dataTransfer.setData('id', task.id);
  }

  return (
    <div className={clsx(
        'droppable-wrapper flex flex-col gap-3'
      )}
    >
      {top && <Droppable top={true} dragged={dragged} />}
      <Card
        draggable
        onDragStart={onDragStart}
        onDragEnd={() => setDrag(false)}
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
      <Droppable dragged={dragged} />
    </div>
  );
};
