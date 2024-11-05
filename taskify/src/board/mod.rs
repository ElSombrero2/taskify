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

  pub fn save(&self, directory: String) -> bool {
    let path = directory.to_owned() + &BOARD_BASE_PATH;
    let json = serde_json::to_string(&self).unwrap();
    fs::write(path, json).is_ok()
  }
}