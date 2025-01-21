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
  pub fn load(directory: String, syntax: impl Syntax<Task>) -> Board {
    Board { 
      name: current_filename(),
      tasks: Task::scan(directory, syntax),
      extra: None,
    }
  }

  pub async fn load_with_plugin(directory: String, syntax: impl Syntax<Task>) {
    let board = load_script("test.js", Self::load(directory, syntax));
    tokio::join!(board);
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
      for task in Task::from_path(filename, &Err(Error::from_str("")), &syntax) {
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
    let path = if Path::new(&filename).is_absolute() { filename.clone() } else { "./".to_owned() + &filename };
    if let Ok(raw_file) = fs::read_to_string(&path) {
      for task in Task::from_path(filename, &Err(Error::from_str("")), &syntax) {
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