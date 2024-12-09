export type Author = {
  name?: string,
  email?: string,
}

export type Info = {
  filename: string,
  start_line: number,
  end_line: number,
  date?: string,
  author?: Author,
}

export type TaskState = 'TODO' | 'READY' | 'WIP' | 'TESTING' | 'DONE'

export type Task = {
  id: string,
  title: string,
  description?: string,
  state: TaskState,
  tags: string[],
  info: Info,
  raw: string,
}

export type GroupedTasks = {[key in TaskState]: Task[]}