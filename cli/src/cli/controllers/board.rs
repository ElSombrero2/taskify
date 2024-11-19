use std::collections::{btree_map::Keys, LinkedList};
use taskify::{board::Board, task::{state::TaskState, Task}};
use crate::cli::controllers::common::{file::current_filename, table::create_table, task::format_task};

pub struct BoardController {}

impl BoardController {
  pub fn show() {
    let board = Self::create_board();
    if board.tasks.is_empty() {
      return println!("The board is empty, add TODOs comments to see them here.");
    }

    let mut map = board.group_by_state();
    let mut table = create_table();

    table.set_header(Self::set_headers(map.keys()));
    while !map.is_empty() {
      let mut all_empty = true;
      let mut row: Vec<String> = vec![];
      for list in map.values_mut() {
        if let Some(task) = list.pop_front() {
          row.push(format_task(&task));
        } else { row.push("".to_string()); }
        all_empty = all_empty && list.is_empty();
      }
      table.add_row(row);
      if all_empty { break; }
    }
    
    println!("{table}");
  }

  fn set_headers (keys: Keys<TaskState, LinkedList<Task>>) -> Vec<String> {
    let mut headers: Vec<String> = vec![];
    for key in keys {
      headers.push(key.to_string());
    }
    headers
  }

  pub fn export (filename: String) {
    let board = Self::create_board();
    if board.save(filename.clone()) {
      println!("Board successfully exported to: {}", filename);
    } else {
      println!("An error occurred, please check if your file is exported to an existing directory");
    }
  }

  fn create_board() -> Board {
    Board { 
      name: current_filename(),
      tasks: Task::scan(".".to_string())
    }
  }
}