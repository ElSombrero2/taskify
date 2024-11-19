use crate::task::{state::TaskState, Task};
use std::{collections::{BTreeMap, LinkedList}, fs::{self}, path::Path, vec};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Board {
  pub name: String,
  pub tasks: Vec<Task>,
}

const BOARD_BASE_PATH: &str = "/.taskify/board.json";

impl Board {
  pub fn load(directory: String) -> Board {
    let path = directory.to_owned() + BOARD_BASE_PATH;
    if let Ok(content) = fs::read_to_string(Path::new(&path)) {
      if let Ok(board) = serde_json::from_str::<Board>(&content) {
        return board;
      }
    }
    Board { name: directory, tasks: vec![] }
  }

  pub fn save(&self, filename: String) -> bool {
    let json = serde_json::to_string(&self).unwrap();
    fs::write(Path::new(&filename), json).is_ok()
  }

  pub fn group_by_state(&self) -> BTreeMap<TaskState, LinkedList<Task>> {
    let mut map: BTreeMap<TaskState, LinkedList<Task>> = BTreeMap::new();
    for task in self.tasks.iter() {
      if let Some(list) = map.get_mut(&task.state) {
        list.push_back(task.clone());
      } else {
        let mut list: LinkedList<Task> = LinkedList::new();
        list.push_back(task.clone());
        map.insert(task.state.clone(), list);
      }
    }
    map
  }
}