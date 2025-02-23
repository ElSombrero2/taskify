import clsx from "clsx";
import { DragEvent, useState } from "react";

type DroppableProps = {
  className?: string;
  activatedClassName?: string;
  disabled?: boolean;
  target?: string;
  // according to https://tailwindcss.com/docs/customizing-spacing
  // corresponding to the padding of the container because 
  offsetSize?: string;
  onDrop?: (id: string, target: string) => void;
}

export const Droppable = ({ className, activatedClassName, disabled, onDrop, target, offsetSize}: DroppableProps) => {
  const [entered, setEntered] = useState(false);
  const [height, setHeight] = useState<string>();

  const onEnter = (e: DragEvent<HTMLDivElement>) => {
    !disabled && setEntered(true);
    const height = parseInt(e?.dataTransfer?.types?.find((e) => e.includes('height'))?.split(':')?.[1] || '0');
    setHeight(`calc(${height}px + ${offsetSize || '0px'})`);
  }

  const drop = (e: DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData('id');
    target && onDrop && onDrop(id, target);
    setEntered(false);
  }

  return (
    <div
      onDragEnterCapture={onEnter}
      onDragLeaveCapture={() => setEntered(false)}
      style={{ height: (entered && height) || undefined }}
      className={clsx(
        'transition-[height,opacity,padding,margin,transform] duration-300',
        !entered && `overflow-hidden opacity-0 ${className}`,
        entered && `opacity-100 ${activatedClassName}`,
      )}
      onDrop={drop}
    >
      <div className={clsx(
        'border border-dashed',
        'border-gray-800 bg-gray-100 dark:border-white dark:bg-gray-800',
        'pointer-events-none flex justify-center items-center',
        'rounded-lg h-full',
      )}>
        Drop Here
      </div>
    </div>
  )
}