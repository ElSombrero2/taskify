import { create } from "zustand";


type FiltersState = {
  query: string | null,
  tags: string[],
  order: 'ASC' | 'DESC',
  field: string,
  setFilter: (query: string | null) => void,
  setSort: (field: string, order: 'ASC' | 'DESC') => void,
	addTag: (tag: string) => void;
	removeTag: (tag: string) => void;
}

export const useFilter = create<FiltersState>((set, get) => ({
  query: null,
  order: 'ASC',
  field: 'date',
  tags: [],
  setFilter: (query) => {
    set(state => ({...state, query, }))
  },
  setSort: (field: string, order: 'ASC' | 'DESC') => {
    set(state => ({ ...state, field, order }))
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
