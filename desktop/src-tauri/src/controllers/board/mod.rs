use std::{collections::{BTreeMap, LinkedList}, sync::Mutex, thread};
use notify::{Event, EventKind};
use serde::Serialize;
use taskify::{board::Board, events, syntax::c_based::CBased, task::{state::TaskState, Task}};
use tauri::{AppHandle, Manager};

#[derive(Serialize, Clone)]
struct Payload<'a> {
  pub tasks: Vec<Task>,
  pub files: &'a str
}

#[tauri::command]
pub async fn get_board(path: String) -> (BTreeMap<TaskState, LinkedList<Task>>, Board) {
  let p = path.clone();
  let project_name = p.split("/").collect::<Vec<&str>>().pop();
  let board = Board::load(path, CBased::new(), project_name);
  let grouped_task = board.group_by_state();
  (grouped_task, board)
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
      move |tasks, files| app.emit_all("file-changed", Payload { tasks, files}).unwrap(),
      |id| app.unlisten(id),
    );
  });
}