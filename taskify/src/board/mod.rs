use crate::task::Task;
use std::{fs::{self}, path::Path, vec};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Board {
  pub name: String,
  pub tasks: Vec<Task>,
}

const BOARD_BASE_PATH: &str = "/.taskify/board.json";

impl Board {
  pub fn load(directory: String) -> Board {
    let path = directory.to_owned() + &BOARD_BASE_PATH;
    if let Ok(content) = fs::read_to_string(Path::new(&path)) {
      if let Ok(board) = serde_json::from_str::<Board>(&content) {
        return board;
      }
    }
    return Board { name: directory, tasks: vec![] };
  }

  pub fn save(&self, root_directory: String) -> bool {
    let path = root_directory.to_owned() + &BOARD_BASE_PATH;
    Board::create_directory(&String::from(root_directory + "/.taskify"));
    let json = serde_json::to_string(&self).unwrap();
    fs::write(path, json).is_ok()
  }

  fn create_directory (path: &String) -> bool {
    if !Path::new(path).exists() {
      return fs::create_dir(path).is_ok();
    }
    return false;
  }
}