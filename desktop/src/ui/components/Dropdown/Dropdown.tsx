import clsx from "clsx"
import React, { useEffect, useRef } from "react"
import { variants } from "./Dropdown.variant"
import { Size } from "../../types/size";

type DropdownProps = { 
  button: React.ReactElement;
  position?: 'left' | 'right' | 'center';
  size?: Size,
  open?: boolean,
  children: React.ReactElement,
  onClickOutside?: () => void,
}

export const Dropdown = ({ button, position, size, open, children, onClickOutside }: DropdownProps) => {
  const element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const call = (e: MouseEvent) => {
      if (!e.composedPath().includes(element.current as any)) {
        onClickOutside && onClickOutside();
      }
    };
    document.body.addEventListener('click', call);
    return () => document.body.removeEventListener('click', call);
  }, []);

  return (
    <div
      ref={element}
      className={clsx(
        'flex flex-col',
        variants.position[position || 'center'],
      )}
    >
      <div>
        {button}
      </div>
      {open && <div className={clsx(
        'bg-white border border-gray-300 bg-opacity-20 backdrop-blur-lg',
        'dark:bg-gray-800 border dark:border-gray-600 dark:bg-opacity-20 dark:backdrop-blur-xl',
        'shadow rounded-md absolute p-1 ',
        'z-50',
        variants.size[size || 'md'],
      )}>
        {children}
      </div>}
    </div>
  )
}