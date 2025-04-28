import { appWindow, LogicalSize } from "@tauri-apps/api/window"
import "./Widget.scss";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Card } from "./components/Card/Card";
import { invoke } from "@tauri-apps/api";
import { Item } from "./components/Item/Item";
import { useWindow } from "../../hooks/window";
import { useBoard } from "../../store/board/board";
import { If } from "../../shared/components/Operators/If/If";

/*
  [TODO]: The widget window auto close
  When you open the widget window in linux
  the window is immediatly closed
  #bug #blocker
*/
export const Widget = () => {
  const [focused, setFocused] = useState(false);
  const { path } = useWindow();
  const { find, board, loading } = useBoard();

  useEffect(() => {
    if (path) {
      find(path, true);
    }
  },[path]);

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
      <If condition={!loading}>
        <div data-tauri-drag-region className="header flex h-0 overflow-hidden opacity-0 flex-col gap-3 transition-all duration-300">
          <div data-tauri-drag-region className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <p className="font-bold text-xl">{board?.name}</p>
              <p className="text-gray-600 dark:text-gray-500">{}</p>
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
            <Card task={board?.tasks[3]!} open={!focused} onClick={!focused ? growUp : growDown} />
          </div>
          {board?.tasks.map((task) => (
            <div className="ticket active pb-2">
              <Card task={task} open={!focused} active onClick={growUp} />
            </div>
          ))}
        </div>
      </If>
    </div>
  )
} 