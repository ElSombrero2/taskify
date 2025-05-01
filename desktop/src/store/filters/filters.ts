import { create } from "zustand";

type FiltersState = {
  query: string | null,
  tags: string[],
  sort: 'ASC' | 'DESC' | null,
  setFilter: (filter: {query: string | null, sort: 'ASC' | 'DESC' | null, tags?: string[]}) => void,
}

export const useFilter = create<FiltersState>((set) => ({
  query: null,
  sort: null,
  tags: [],
  setFilter: ({query, sort, tags}) => {
    set(state => ({...state, query, sort, tags, }))
  }
}));