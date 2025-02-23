import { create } from "zustand";
import { Board, BoardTuple } from "@/types/board";
import { GroupedTasks, TaskState } from "@/types/task";
import { invoke } from "@tauri-apps/api";

type BoardState = {
  loading: boolean,
  board?: Board,
  tasks?: GroupedTasks,
  path?: string,
  find: (path: string, loading?: boolean) => Promise<void>;
  load: (loading: boolean) => void;
  updateTask: (id: string, file: string, from: TaskState, to: TaskState) => Promise<void>;
  reload: (loading?: boolean) => void;
}

export const useBoard = create<BoardState>((set, get) => ({
  loading: false,
  load: (loading: boolean) => set(state => ({...state, loading})),
  find: async (path: string, loading: boolean = true) => {
    get().load(loading);
    const [tasks, board] = await invoke<BoardTuple>('get_board', {path})

    set(state => ({
      ...state,
      path,
      tasks,
      board,
      loading: false,
    }));
  },
  reload: (loading: boolean = true) => {
    const { find, path } = get();
    path && find(path, loading);
  },
  updateTask: async (id: string, filename: string, from: TaskState, to: TaskState) => {
    const { load, reload } = get();
    load(true);
    await invoke('move_task', {id, filename, from, to});
    reload(true);
  }
}));