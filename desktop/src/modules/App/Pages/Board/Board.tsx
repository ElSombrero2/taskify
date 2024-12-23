import { useEffect } from "react"
import { Header } from "./Sections/Header/Header"
import { Options } from "./Sections/Options/Options"
import { useBoard } from "@/store/board/board"
import { Tasks } from "./Sections/Tasks/Tasks"
import { Navigation } from "./Sections/Navigation/Navigation"

export const Board = () => {
  const { find } = useBoard();
  
  useEffect(() => {
    find('/home/elsombrero/Bureau/taskify')
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