export type Author = {
  name?: string,
  email?: string,
}

export type AttachedFile = {
  name: string,
  url: string,
  size: number,
  mime_type: string,
}

export type Info = {
  filename: string,
  start_line: number,
  end_line: number,
  date?: string,
  author?: Author,
  attached_files: AttachedFile[]
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