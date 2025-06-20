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
  [READY]: Add a board and list sorting strategy
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

  /*
    [TODO]: Create alert for all the additionnal messages
    Create an alert component that can be wrapped globaly and
    called anywhere inside the application
    based on this model
    #medium #improvement
    ![alert](https://cdn.dribbble.com/userupload/29008886/file/original-6bb07fc79059a953303ac78dcbd88915.png?resize=1024x768&vertical=center)

  */

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