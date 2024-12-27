use std::{collections::{BTreeMap, LinkedList}, sync::Mutex, thread};
use serde::Serialize;
use taskify::{board::Board, events, syntax::c_based::CBased, task::{state::TaskState, Task}};
use tauri::{AppHandle, Manager, State};

use crate::AppState;

#[derive(Serialize, Clone)]
struct Payload<'a> {
  pub tasks: Vec<Task>,
  pub files: &'a str
}

#[tauri::command]
pub async fn get_board(path: String) -> (BTreeMap<TaskState, LinkedList<Task>>, Board) {
  let board = Board::load(path, CBased::new());
  let grouped_task = board.group_by_state();
  (grouped_task, board)
}

#[tauri::command]
pub async fn move_task(id: String, filename: String, from: TaskState, to: TaskState) {
  Board::change_state(format!("/{filename}"), id, from, to, CBased::new());
}

#[tauri::command]
pub fn start_listen(state: State<'_, Mutex<AppState>>, app: AppHandle, path: String) {
  let mut app_state = state.lock().unwrap();
  let app_mutex = Mutex::new(app);
  if !app_state.is_listening {
    app_state.is_listening = true;
    thread::spawn(move || {
    let app = app_mutex.lock().unwrap();
      events::on_file_change(path, CBased::new(), move |tasks, files| {
        app.emit_all("file-changed", Payload { tasks, files}).unwrap();
        return false;
      });
    });
  }
}