import { appWindow, LogicalSize } from "@tauri-apps/api/window"
import { TabItem } from "./components/TabItem/TabItem"
import "./Widget.scss";
import { useState } from "react";
import clsx from "clsx";
import { Card } from "./components/Card/Card";
import { invoke } from "@tauri-apps/api";

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
            <p className="text-zinc-600 dark:text-zinc-500">Wednesday, 11 May</p>
          </div>
          <button onClick={close}>
            <i className="fa fa-xmark"></i>
          </button>
        </div>
        <div className="flex justify-between text-zinc-500">
          <TabItem active size={2}>
            Todo
          </TabItem>
          <TabItem size={100}>
            Ready
          </TabItem>
          <TabItem size={100}>
            Wip
          </TabItem>
          <TabItem size={100}>
            Test
          </TabItem>
          <TabItem size={100}>
            Done
          </TabItem>
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