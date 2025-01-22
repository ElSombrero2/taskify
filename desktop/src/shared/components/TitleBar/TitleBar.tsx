import { appWindow } from "@tauri-apps/api/window";
import { useWindow } from "@/hooks/window";
import { invoke } from "@tauri-apps/api";
import { useContext, useEffect, useState } from "react";
import './TitleBar.scss'
import clsx from "clsx";
import { SearchBar } from "./SearchBar/SearchBar";
import { Toggler } from "./Toggler/Toggler";
import { Theme } from "../../../providers/Theme/Theme";
import { useListener } from "@/hooks/listener";

export const TitleBar = () => {
  const { isWidget } = useWindow();
  const [maximized, setMaximized] = useState(false);
  const { setTheme, theme } = useContext(Theme);
  const [items, setItems] = useState<string[]>([]);

  useListener('tauri://resize', async () => {
    setMaximized(await appWindow.isMaximized());
    if (!isWidget && !await appWindow.isMinimized()) {
      await invoke('close_widget');
    }
  })

  useEffect(() => {
    setItems((JSON.parse(localStorage.getItem('TASKIFY_RECENT_PROJECT') || '[]') as string[])
    .map((path) => path.split('/').pop() as string));
  }, []);

  const minimize = async () => {
    await invoke('open_widget', { theme });
    await appWindow.minimize();
  }
  const close = async () => await appWindow.close();
  const maximize = async () => await appWindow.toggleMaximize();

  const switchTheme = (isLight: boolean) => setTheme(isLight ? 'light' : 'dark')

  return (
    <div data-tauri-drag-region className="flex justify-between items-center pl-2">
      <div className="flex items-center gap-4">
        <p className="text font-bold">
          Taskify<span className="text-rose-500">.io</span>
        </p>
        <div className="flex gap-2 items-center">
          <Toggler defaultValue={theme !== 'dark'} onChange={switchTheme} />
        </div>
      </div>
      <SearchBar className="relative left-8" words={items} />
      <div className="flex items-center gap-6">
        <div className="flex gap-2 relative left-[4px]">
          <button onClick={minimize} className="title-bar-button hover:bg-gray-200 dark:hover:bg-gray-700">
            <i className="window-minimize text-xl"></i>
          </button>
          <button onClick={maximize} className="title-bar-button hover:bg-gray-200 dark:hover:bg-gray-700">
            <i className={clsx(
              'text-xl',
              maximized ? 'window-restore' : 'window-maximize',
            )}></i>
          </button>
          <button onClick={close} className="title-bar-button hover:bg-red-200 dark:hover:bg-red-700">
            <i className="window-xmark text-lg"></i>
          </button>
        </div>
      </div>
    </div>
  )
}