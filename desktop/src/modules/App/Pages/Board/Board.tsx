import { useEffect } from "react"
import { Header } from "./Sections/Header/Header"
import { Options } from "./Sections/Options/Options"
import { useBoard } from "@/store/board/board"
import { Tasks } from "./Sections/Tasks/Tasks"
import { Navigation } from "./Sections/Navigation/Navigation"
import { listen } from "@tauri-apps/api/event"
import { useSearchParams } from "react-router"
import { invoke } from "@tauri-apps/api"

export const Board = () => {
  const { find, reload } = useBoard();
  const [ params ] = useSearchParams();
  
  useEffect(() => {
    const path = params.get('path');
    if (path) {
      invoke('start_listen', {path});
      find(path);
      listen('file-changed', () => reload());
    }
  }, [params]);

  return (
    <div>
      <Header />
      <Options />
      <Navigation />
      <div className="p-1">
        <Tasks />
      </div>
    </div>
  )
}