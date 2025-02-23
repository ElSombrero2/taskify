import { Project } from "@/types/project";
import { create } from "zustand";

const RECENT_PROJECT = 'TASKIFY_RECENT_PROJECT';

type ProjectState = {
  projects: Project[],
  save: (path: string) => void,
  load: () => void,
}

export const useProject = create<ProjectState>((set, get) => ({
  projects: [],
  load: () => {
    const json = localStorage.getItem(RECENT_PROJECT);
    let projects: Project[] = [];
    if (json) {
      try {
        projects = JSON.parse(json) as Project[];
      } finally {
        set(state => ({...state, projects}))
      }
    }
  },
  save: (path: string) => {
    const { projects } = get();
    if (!projects.find((p) => p.path === path)) {
      projects.unshift({
        path: path,
        folders: path.split('/'),
      });
      localStorage.setItem(RECENT_PROJECT, JSON.stringify(projects));
      set((state) => ({...state, projects: [...projects]}));
    }
  }
}));