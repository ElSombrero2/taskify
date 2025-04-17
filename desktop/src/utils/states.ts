import { TaskState } from "@/types/task"
import { Theme } from "../ui/types/theme"

type State = {
  type: TaskState,
  className: string,
  theme: Theme | 'success' | 'danger' | 'warning' | 'disabled',
  label: string,
}

export const States: State[] = [
  {
    type: 'TODO',
    label: 'To do',
    className: 'text-rose-500', 
    theme: 'danger',
  },
  {
    type: 'READY',
    label: 'Ready',
    className: 'text-orange-500', 
    theme: 'warning',
  },
  {
    type: 'WIP',
    label: 'Work in Progress',
    className: 'text-green-500', 
    theme: 'success',
  },
  {
    type: 'TESTING',
    label: 'Testing',
    className: 'text-blue-500', 
    theme: 'primary',
  },
  {
    type: 'DONE',
    label: 'Done',
    className: 'text-gray-500', 
    theme: 'disabled',
  }
]

export const StatesMap = {
  TODO: {
    type: 'TODO',
    label: 'To do',
    className: 'text-rose-500', 
    theme: 'danger',
  },
  READY: {
    type: 'READY',
    label: 'Ready',
    className: 'text-orange-500', 
    theme: 'warning',
  },
  WIP: {
    type: 'WIP',
    label: 'Work in Progress',
    className: 'text-green-500', 
    theme: 'success',
  },
  TESTING: {
    type: 'TESTING',
    label: 'Testing',
    className: 'text-blue-500', 
    theme: 'primary',
  },
  DONE: {
    type: 'DONE',
    label: 'Done',
    className: 'text-green-500', 
    theme: 'disabled',
  }
}