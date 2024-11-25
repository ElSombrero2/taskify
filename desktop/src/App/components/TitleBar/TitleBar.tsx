import { appWindow } from "@tauri-apps/api/window";
import { useWindow } from "../../../hooks/window";
import { invoke } from "@tauri-apps/api";
import { useContext, useEffect, useState } from "react";
import './TitleBar.scss'
import clsx from "clsx";
import { SearchBar } from "./SearchBar/SearchBar";
import { Theme } from "../../../Providers/Theme/Theme";
import { Toggler } from "./Toggler/Toggler";

export const TitleBar = () => {
  const { isWidget } = useWindow();
  const [maximized, setMaximized] = useState(false);
  const { setTheme, theme } = useContext(Theme);

  const minimize = async () => {
    await appWindow.minimize();
    await invoke('open_widget', { theme });
  }
  const close = async () => await appWindow.close();
  const maximize = async () => await appWindow.toggleMaximize();

  useEffect(() => {
    const listener = appWindow.onResized(async () => {
      setMaximized(await appWindow.isMaximized());
      if (!isWidget && !await appWindow.isMinimized()) {
        await invoke('close_widget');
      }
    })

    return () => {
      listener.then(free => free());
    }
  }, []);

  const switchTheme = (isLight: boolean) => setTheme(isLight ? 'light' : 'dark')

  return (
    <div data-tauri-drag-region className="flex justify-between items-center pl-2">
      <div className="flex items-center gap-4">
        <p className="text">
          <i className="fa-solid fa-binoculars"></i>
        </p>
        <div className="flex gap-2 items-center">
          <Toggler onChange={switchTheme} />
        </div>
      </div>
      <SearchBar className="relative left-8" words={['Taskify', 'New Project', 'Where are your', 'Help Me please']} />
      <div className="flex items-center gap-6">
        <div className="flex gap-2 relative left-[4px]">
          <button onClick={minimize} className="title-bar-button hover:bg-zinc-200 dark:hover:bg-zinc-700">
            <i className="window-minimize text-xl"></i>
          </button>
          <button onClick={maximize} className="title-bar-button hover:bg-zinc-200 dark:hover:bg-zinc-700">
            <i className={clsx(
              'text-xl',
              maximized ? 'window-restore' : 'window-maximize',
            )}></i>
          </button>
          <button onClick={close} className="title-bar-button rounded-tr-md hover:bg-red-200 dark:hover:bg-red-700">
            <i className="window-xmark text-lg"></i>
          </button>
        </div>
      </div>
    </div>
  )
}