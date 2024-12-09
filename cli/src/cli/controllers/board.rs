use std::collections::{btree_map::Keys, LinkedList};
use taskify::{board::Board, syntax::{c_based::CBased, Syntax}, task::{state::TaskState, Task}};
use crate::cli::controllers::common::{table::create_table, task::format_task};

pub struct BoardController {}

impl BoardController {
  pub fn show(dir: Option<String>, syntax: impl Syntax<Task>) {
    let board = Board::load(dir.unwrap_or(".".to_string()), syntax, "extensions");
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

  pub fn export (filename: String, path: Option<String>, syntax: impl Syntax<Task>) {
    let board = Board::load(path.unwrap_or(".".into()), syntax, "extensions");
    if board.save(filename.clone()) {
      println!("Board successfully exported to: {}.", filename);
    } else {
      println!("An error occurred, please check if your file is exported to an existing directory!");
    }
  }

  pub fn remove(filename: String, raw: String) {
    if Board::remove_task(filename, raw, CBased::new()) {
      println!("Your task was removed!");
    } else {
      println!("Cannot remove the current task, please try again!");
    }
  }

  pub fn move_task(filename: String, raw: String, from: TaskState, to: TaskState) {
    if Board::change_state(filename, raw, from.clone(), to.clone(),CBased::new())  {
      println!("Your task was moved from {} to  {}!", from, to);
    } else {
      println!("Cannot move the current task, please try again!");
    }
  }
}