import { useEffect } from "react"
import { Header } from "./Sections/Header/Header"
import { Options } from "./Sections/Options/Options"
import { useBoard } from "@/store/board/board"
import { Tasks } from "./Sections/Tasks/Tasks"
import { Navigation } from "./Sections/Navigation/Navigation"
import { listen } from "@tauri-apps/api/event"

/*
  [TODO]: Hello World
  Holla cool
*/
export const Board = () => {
  const { find } = useBoard();
  
  useEffect(() => {
    find('/home/elsombrero/Bureau/taskify');

    listen('file-changed', () => {
      find('/home/elsombrero/Bureau/taskify');
    });
  }, []);

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