use crate::{plugins::load_script, syntax::Syntax, task::{state::TaskState, Task}, utils::file::current_filename};
use std::{collections::{BTreeMap, LinkedList}, fs::{self}, path::Path};
use base64::{prelude::BASE64_STANDARD, Engine};
use git2::Error;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use utoipa::ToSchema;

#[derive(Debug, Serialize, Deserialize, Clone, ToSchema)]
pub struct Board {
  pub name: String,
  pub tasks: Vec<Task>,
  pub extra: Option<Value>,
}

impl Board {
  pub fn load(directory: String, syntax: impl Syntax<Task>, extension_dir: &str) -> Board {
    let mut board = Board { 
      name: current_filename(),
      tasks: Task::scan(directory, syntax),
      extra: None,
    };

    let runtime = tokio::runtime::Runtime::new().unwrap();
    for dir in fs::read_dir(extension_dir).unwrap().flatten() {
      let filename = dir.file_name().into_string().unwrap();
      board = runtime.block_on(load_script(&format!("{}/{}/index.js", extension_dir, filename), board.clone()));
    }

    board
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

  pub fn remove_task(filename: String, id: String, syntax: impl Syntax<Task>) -> bool {
    let path = "./".to_owned() + &filename;
    if let Ok(raw_file) = fs::read_to_string(&path) {
      for task in Task::match_regex(filename, &Err(Error::from_str("")), &syntax) {
        if task.verify(&id) {
          if let Some(comment) = Self::decode_comment(task.raw) {
            return fs::write(&path, raw_file.replace(&comment, "")).is_ok();
          }
        }
      }
    }
    false
  }

  pub fn change_state (filename: String, id: String, current_state: TaskState, state: TaskState, syntax: impl Syntax<Task>) -> bool {
    let path = "./".to_owned() + &filename;
    if let Ok(raw_file) = fs::read_to_string(&path) {
      for task in Task::match_regex(filename, &Err(Error::from_str("")), &syntax) {
        if task.verify(&id) {
          if let Some(comment) = Self::decode_comment(task.raw) {
            let new_comment = comment.replace(&format!("[{}]: ", current_state.id()), &format!("[{}]: ", state.id()));
            return fs::write(&path, raw_file.replace(&comment, &new_comment)).is_ok();
          }
        }

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