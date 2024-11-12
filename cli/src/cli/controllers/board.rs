use std::{collections::{btree_map::Keys, LinkedList}, env};

use comfy_table::{modifiers::UTF8_ROUND_CORNERS, presets::UTF8_FULL, ContentArrangement, Table};
use taskify::{board::Board, task::{state::TaskState, Task}};

use crate::cli::SubCommand;

pub struct BoardController {}

impl BoardController {
  pub fn board(cmd: &SubCommand) {
    match cmd {
      SubCommand::Board {show, ..} if *show => {
      Self::show();
    }
      _ => {}
    }
  }

  fn show() {
    let board = Board::load(Self::path());
    let mut map = board.group_by_state();
    let mut table = Table::new();
    table
    .load_preset(UTF8_FULL)
      .apply_modifier(UTF8_ROUND_CORNERS)
      .set_content_arrangement(ContentArrangement::Dynamic)
      .set_header(Self::set_headers(map.keys()));
    
    while !map.is_empty() {
      let mut all_empty = true;
      let mut row: Vec<String> = vec![];
      for list in map.values_mut() {
        if let Some(task) = list.pop_front() {
          row.push(format!("{}\n\n{}", task.title, task.description.unwrap_or_default()));
        } else { row.push("".to_string()); }
        all_empty = all_empty && list.is_empty();
      }
      table.add_row(row);
      if all_empty { break; }
    }
    
    println!("{table}");
  }

  fn path () -> String {
    return env::current_dir()
      .unwrap_or_default()
      .to_string_lossy()
      .to_string();  
  }

  fn set_headers (keys: Keys<TaskState, LinkedList<Task>>) -> Vec<String> {
    let mut headers: Vec<String> = vec![];
    for key in keys {
      headers.push(key.to_string());
    }
    headers
  }
}