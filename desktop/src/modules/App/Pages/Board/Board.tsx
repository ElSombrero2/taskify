import { useEffect } from "react"
import { Header } from "./Sections/Header/Header"
import { Options } from "./Sections/Options/Options"
import { useBoard } from "@/store/board/board"
import { Navigation } from "./Sections/Navigation/Navigation"
import { Outlet, useSearchParams } from "react-router"
import { invoke } from "@tauri-apps/api"
import { useListener } from "@/hooks/listener"
import { appWindow } from "@tauri-apps/api/window"

/*
  [TODO]: Add a board and list sorting strategy
  Create a board filtering and sorting strategy
  for showing all the board elements directly from the store
  #task #medium
*/
export const Board = () => {
  const { find, reload } = useBoard();
  const [ params ] = useSearchParams();

  useListener('file-changed', () => reload(false));
  
  useEffect(() => {
    const path = params.get('path');
    if (path) {
      invoke('start_listen', {path, dispose: false});
      find(path);
    }
  }, []);

  useEffect(() => () => {
    appWindow.emit('file-stop-waching', {});
  }, []);

  return (
    <div>
      <Header />
      <Options />
      <Navigation />
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  )
}