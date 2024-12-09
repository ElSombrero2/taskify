use std::collections::{BTreeMap, LinkedList};

use taskify::{board::Board, syntax::c_based::CBased, task::{state::TaskState, Task}};

#[tauri::command]
pub fn get_board(path: String) -> (BTreeMap<TaskState, LinkedList<Task>>, Board) {
  let board = Board::load(path, CBased::new(), "../../extensions");
  let grouped_task = board.group_by_state();
  (grouped_task, board)
}