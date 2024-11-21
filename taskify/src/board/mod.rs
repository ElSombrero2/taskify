use crate::{task::{state::TaskState, Task}, utils::file::current_filename};
use std::{collections::{BTreeMap, LinkedList}, fs::{self}, path::Path, vec};
use base64::{prelude::BASE64_STANDARD, Engine};
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

#[derive(Debug, Serialize, Deserialize, Clone, ToSchema)]
pub struct Board {
  pub name: String,
  pub tasks: Vec<Task>,
}

impl Board {
  pub fn load(directory: String) -> Board {
    Board { 
      name: current_filename(),
      tasks: Task::scan(directory)
    }
  }

  pub fn load_from_file(directory: String) -> Board {
    let path = directory.to_owned();
    if let Ok(content) = fs::read_to_string(Path::new(&path)) {
      if let Ok(board) = serde_json::from_str::<Board>(&content) {
        return board;
      }
    }
    Board { name: directory, tasks: vec![] }
  }

  pub fn save(&self, filename: String) -> bool {
    let json = serde_json::to_string_pretty(&self).unwrap();
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

  pub fn remove_task(filename: String, raw: String) -> bool {
    if let Some(comment) = Self::decode_comment(raw) {
      let path = "./".to_owned() + &filename;
      if let Ok(file) = fs::read_to_string(&path) {

        return fs::write(&path, file.replace(&comment, "")).is_ok();
      }
    }
    false
  }

  pub fn change_state (filename: String, raw: String, current_state: TaskState, state: TaskState) -> bool {
    if let Some(comment) = Self::decode_comment(raw) {
      let new_comment = comment.replace(&format!("[{}]: ", current_state.id()), &format!("[{}]: ", state.id()));
      let path = "./".to_owned() + &filename;
      if let Ok(file) = fs::read_to_string(&path) {
        return fs::write(&path, file.replace(&comment, &new_comment)).is_ok();
      }
    }
    false
  }

  fn decode_comment (raw: String) -> Option<String> {
    if let Ok(decoded) = BASE64_STANDARD.decode(raw) {
      if let Ok(comment) = String::from_utf8(decoded) {
        return Some(comment);
      }
    }
    None
  }
}