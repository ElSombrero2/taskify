import { create } from "zustand";
import { Board, BoardTuple } from "@/types/board";
import { GroupedTasks, TaskState } from "@/types/task";
import { invoke } from "@tauri-apps/api";

type BoardState = {
  loading: boolean,
  board?: Board,
  tasks?: GroupedTasks,
  find: (path: string) => Promise<void>;
  load: (loading: boolean) => void;
  updateTask: (id: string, file: string, from: TaskState, to: TaskState) => Promise<void>;
}

export const useBoard = create<BoardState>((set, get) => ({
  loading: false,
  load: (loading: boolean) => set(state => ({...state, loading})),
  find: async (path: string) => {
    get().load(true);

    const [tasks, board] = await invoke<BoardTuple>('get_board', {path})
    
    set(state => ({
      ...state,
      tasks,
      board,
      loading: false,
    }));
  },
  updateTask: async (id: string, filename: string, from: TaskState, to: TaskState) => {
    const { load, find } = get();
    load(true);
    await invoke('move_task', {id, filename, from, to});
    await find('/home/elsombrero/Bureau/taskify');
  }
}));