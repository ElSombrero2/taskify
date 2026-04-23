use std::{collections::{BTreeMap, LinkedList}, fs, path::Path, sync::Mutex, thread};
use notify::{Event, EventKind};
use serde::Serialize;
use taskify::{board::Board, events, syntax::c_based::CBased, task::{state::TaskState, Task}};
use tauri::{AppHandle, Manager};

#[derive(Serialize, Clone)]
struct Payload<'a> {
  pub tasks: Vec<Task>,
  pub files: &'a str
}

fn get_readme (path: &str) -> Option<String> {
  let path_buff = Path::new(path).join("README.md");
  if let Ok(content) = fs::read_to_string(path_buff) {
    return Some(content);
  }
  None
}

fn get_project_name (path: &str) -> Option<&str> {
  #[cfg(target_os = "linux")]
  return path.split("/").collect::<Vec<&str>>().pop();
  #[cfg(target_os = "windows")]
  return path.split("\\").collect::<Vec<&str>>().pop();
}

#[tauri::command]
pub async fn get_board(path: String) -> (BTreeMap<TaskState, LinkedList<Task>>, Board, Option<String>) {
  let p = path.clone();
  let readme = get_readme(&path);
  let project_name = get_project_name(&p);
  let board = Board::load(path, CBased::new(), project_name);
  let grouped_task = board.group_by_state();
  (grouped_task, board, readme)
}

#[tauri::command]
pub async fn move_task(id: String, filename: String, from: TaskState, to: TaskState) {
  #[cfg(target_os = "linux")]
  Board::change_state(format!("/{filename}"), id, from, to, CBased::new());
  #[cfg(target_os = "windows")]
  Board::change_state(filename, id, from, to, CBased::new());
}

#[tauri::command]
pub fn start_listen(global_app: AppHandle, path: String) {
  let app_mutex = Mutex::new(global_app);
  thread::spawn(move || {
    let app = &app_mutex.lock().unwrap();

    events::on_file_change(
      path, CBased::new(), 
      move |tx| {
        app.listen_global("file-stop-waching", move |_| {
          let event = Event::new(EventKind::Any).set_info("END");
          tx.send(Ok(event)).unwrap()
        })
      },
      move |tasks, files| app.emit_all("file-changed", Payload { tasks, files }).unwrap(),
      |id| app.unlisten(id),
    );
  });
}

#[tauri::command]
pub fn save (path: String, board: Board) {
  board.save(path);
}