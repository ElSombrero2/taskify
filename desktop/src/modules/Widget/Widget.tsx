import { appWindow, LogicalSize } from "@tauri-apps/api/window"
import "./Widget.scss";
import { useState } from "react";
import clsx from "clsx";
import { Card } from "./components/Card/Card";
import { invoke } from "@tauri-apps/api";
import { Item } from "./components/Item/Item";

/*

  [TODO]: The widget window auto close
  When you open the widget window in linux
  the window is immediatly closed  
*/
export const Widget = () => {
  const [focused, setFocused] = useState(false);

  const growUp = async () => {
    setFocused(true);
    appWindow.setSize(new LogicalSize((await appWindow.innerSize()).width, 650));
  }

  const growDown = async () => {
    setFocused(false);
    appWindow.setSize(new LogicalSize((await appWindow.innerSize()).width, 285));
  }

  const close = async () => await invoke('close_widget');

  return (
    <div data-tauri-drag-region className={clsx(
      'main p-4 flex flex-col gap-3 overflow-scroll',
      focused && 'focused',
    )}>
      <div data-tauri-drag-region className="header flex h-0 overflow-hidden opacity-0 flex-col gap-3 transition-all duration-300">
        <div data-tauri-drag-region className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <p className="font-bold text-xl">Project Name</p>
            <p className="text-gray-600 dark:text-gray-500">Wednesday, 11 May</p>
          </div>
          <button onClick={close}>
            <i className="fa fa-xmark"></i>
          </button>
        </div>
        <div className="flex justify-between text-gray-500">
          <Item active count={100}>
            Todo
          </Item>
          <Item count={100}>
            Ready
          </Item>
          <Item count={100}>
            Wip
          </Item>
          <Item count={100}>
            Testing
          </Item>
          <Item count={100}>
            Done
          </Item>
        </div>
      </div>
      <div className={clsx(
        'tickets flex flex-col gap-4 max-h-[500px]',
        focused && 'overflow-auto',
        !focused && 'overflow-hidden'
      )}>
        <div className="ticket active pb-2">
          <Card open={!focused} active onClick={growUp} />
        </div>

        <div className="ticket pb-2">
          <Card open={!focused} onClick={growDown} />
        </div>

        <div className="ticket pb-2">
          <Card open={!focused} onClick={growDown} />
        </div>

        <div className="ticket pb-2">
          <Card open={!focused} onClick={growDown} />
        </div>

        <div className="ticket pb-2">
          <Card open={!focused} onClick={growDown} />
        </div>

        <div className="ticket pb-2">
          <Card open={!focused} onClick={growDown} />
        </div>

        <div className="ticket pb-2">
          <Card open={!focused} onClick={growDown} />
        </div>
        <div className="ticket pb-2">
          <Card open={!focused} onClick={growDown} />
        </div>
        <div className="ticket pb-2">
          <Card open={!focused} onClick={growDown} />
        </div>
        <div className="ticket pb-2">
          <Card open={!focused} onClick={growDown} />
        </div>
        <div className="ticket pb-2">
          <Card open={!focused} onClick={growDown} />
        </div>
      </div>
    </div>
  )
} 