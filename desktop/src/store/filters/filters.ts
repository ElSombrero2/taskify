import { create } from "zustand";


type FiltersState = {
  query: string | null,
  tags: string[],
  sort: 'ASC' | 'DESC',
  field: string,
  setFilter: (query: string | null) => void,
  setSort: (field: string, sort: 'ASC' | 'DESC') => void,
	addTag: (tag: string) => void;
	removeTag: (tag: string) => void;
}

export const useFilter = create<FiltersState>((set, get) => ({
  query: null,
  sort: 'ASC',
  field: 'date',
  tags: [],
  setFilter: (query) => {
    set(state => ({...state, query, }))
  },
  setSort: (field: string, sort: 'ASC' | 'DESC') => {
    set(state => ({ ...state, field, sort }))
  },
	addTag: (tag: string) => {
		const { tags } = get();
		set(state => ({ ...state, tags: [...tags, tag] }))	
	},
	removeTag: (tag: string) => {
		const { tags } = get();
		set(state => ({...state, tags: tags.filter((t) => t !== tag)}));
	},
}));
