import { create } from "zustand";
import { Board } from "@/types/board";
import { GroupedTasks } from "@/types/task";

type BoardState = {
  loading: boolean,
  board?: Board,
  tasks?: GroupedTasks,
  update: (states: {loading: boolean,
    board?: Board,
    tasks?: GroupedTasks,}) => void
}

export const useBoard = create<BoardState>((set) => ({
  loading: false,
  update: (nextState: {loading?: boolean, tasks?: GroupedTasks, board?: Board}) => {
    set(state => ({
      ...state,
      ...nextState,
    }))
  }
}));