import { useEffect } from "react"
import { Header } from "./Sections/Header/Header"
import { Options } from "./Sections/Options/Options"
import { invoke } from "@tauri-apps/api"
import { BoardTuple } from "@/types/board"
import { useBoard } from "@/store/board/board"
import { Tasks } from "./Sections/Tasks/Tasks"
import { Navigation } from "./Sections/Navigation/Navigation"

export const Board = () => {
  const { update } = useBoard();
  
  useEffect(() => {
    update({loading: true});
    invoke<BoardTuple>('get_board', {path: 'C:\\Users\\niril\\OneDrive\\Bureau\\taskify'})
    .then(([grouped, board]) => {
      update({board, tasks: grouped, loading: false});
    })
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