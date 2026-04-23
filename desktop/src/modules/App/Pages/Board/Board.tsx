import { useEffect } from "react"
import { Header } from "./Sections/Header/Header"
import { Options } from "./Sections/Options/Options"
import { useBoard } from "@/store/board/board"
import { Navigation } from "./Sections/Navigation/Navigation"
import { Outlet, useSearchParams } from "react-router"
import { invoke } from "@tauri-apps/api"
import { useListener } from "@/hooks/listener"
import { appWindow } from "@tauri-apps/api/window"
import { useFilterableBoard } from "@/hooks/filterable-board"
import { useNotification } from "../../../../store/notification/notifications"

/*
  [DONE]: Add a board and list sorting strategy
  Create a board filtering and sorting strategy
  for showing all the board elements directly from the store
  #task #medium
*/
export const Board = () => {
  const { find, reload } = useBoard();
  const [ params ] = useSearchParams();
  const { push } = useNotification();

	const {} = useFilterableBoard();

  useListener('file-changed', ({payload}: any) => {
    reload(false);
    const id = payload.tasks.map((t: any) => t.id)?.join('-');
    push({
      description: 'Your board is refreshing because a file was updated!',
      title: 'File changed',
      duration: 10000,
      type: 'info',
      id: id,
    });
  });
  
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
    [TESTING]: Create alert for all the additionnal messages
    Create an alert component that can be wrapped globaly and
    called anywhere inside the application
    based on this model
    Here is an example of UI for alert message 
		![message](https://cdn.dribbble.com/userupload/37149745/file/original-8545800201eb6e4d4dc715a7deae093b.png?resize=752x535&vertical=center)
		#medium #improvement
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
