import { create } from "zustand";

type LabelValue = {
  label: string,
  value: string,
}

type FiltersState = {
  query: string | null,
  tags: string[],
  sort: 'ASC' | 'DESC',
  field: LabelValue,
  setFilter: (query: string | null) => void,
  setSort: (field: LabelValue, sort: 'ASC' | 'DESC') => void,
}

export const useFilter = create<FiltersState>((set) => ({
  query: null,
  sort: 'ASC',
  field: {
    value: 'date',
    label: 'Date',
  },
  tags: [],
  setFilter: (query) => {
    set(state => ({...state, query, }))
  },
  setSort: (field: LabelValue, sort: 'ASC' | 'DESC') => {
    set(state => ({ ...state, field, sort }))
  },
}));