import { TaskState } from "@/types/task"
import { Theme } from "../ui/types/theme"

type State = {
  type: TaskState,
  className: string,
  theme: Theme | 'success' | 'danger' | 'warning',
  label: string,
}

export const States: State[] = [
  {
    type: 'TODO',
    label: 'To do',
    className: 'text-blue-500', 
    theme: 'primary',
  },
  {
    type: 'READY',
    label: 'Ready',
    className: 'text-green-500', 
    theme: 'success',
  },
  {
    type: 'WIP',
    label: 'Work in Progress',
    className: 'text-rose-500', 
    theme: 'danger',
  },
  {
    type: 'TESTING',
    label: 'Testing',
    className: 'text-orange-500', 
    theme: 'warning',
  },
  {
    type: 'DONE',
    label: 'Done',
    className: 'text-green-500', 
    theme: 'primary',
  }
]