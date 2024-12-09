use crate::{info::Info, syntax::Syntax};
use base64::{prelude::BASE64_STANDARD, Engine};
use git2::{Error, Repository};
use serde::{Deserialize, Serialize};
use state::TaskState;
use utoipa::ToSchema;
use std::{collections::LinkedList, fs::{self, DirEntry}, vec};

pub mod state;
pub mod ignore;
pub mod regex;

#[derive(Debug, Default, Serialize, Deserialize, Clone, ToSchema)]
pub struct Task {
  pub id: String,
  pub title: String,
  pub description: Option<String>,
  pub state: TaskState,
  pub tags: Vec<String>,
  pub info: Info,
  pub raw: String,
}

impl Task {
  pub fn new (title: String, description: Option<String>, state: TaskState, tags: Vec<String>, info: Info, raw: String) -> Self {
    let start_line = info.start_line;
    let end_line = info.end_line;
    Self { 
      title: title.clone(), description, state, tags, info, raw,
      id: Self::create_id(&title, start_line, end_line),
    }
  }

  pub fn verify (&self, token: &str) -> bool {
    Self::create_id(&self.title, self.info.start_line, self.info.end_line).eq(token)
  }

  fn create_id (title: &str, start_line: usize, end_line: usize) -> String {
    let encoded_title = BASE64_STANDARD.encode(title);
    let encoded_line = BASE64_STANDARD.encode(format!("({},{})", start_line, end_line));
    format!("{}.{}", encoded_title, encoded_line)
  }

  pub fn scan(directory: String, syntax: impl Syntax<Task>) -> Vec<Task> {
    let mut tasks: Vec<Task> = vec![];
    let mut stack: LinkedList<String> = LinkedList::new();

    let names = Task::read_ignore_file(directory.clone());
    let repos = Repository::open(&directory);
    
    stack.push_back(directory.clone());
    
    while !stack.is_empty() {
      if let Some(dir) = stack.pop_back() {
        if let Ok(files) = fs::read_dir(&dir) {
          for file in files.flatten() {
            if !Task::is_ignored(&names, &file) {
              tasks.append(&mut Task::get_path(file, &mut stack, &repos, &syntax));
            }
          }
        }
      }
    }
    tasks
  }

  fn get_path(file: DirEntry, stack: &mut LinkedList<String>, repository: &Result<Repository, Error>, syntax: &impl Syntax<Task>) -> Vec<Task> {
    if let Some(path) = file.path().to_str() {
      if let Ok(file_type) = file.file_type() {
        if file_type.is_dir() {
          stack.push_back(path.to_string());
        } else {
          return Task::match_regex(path.to_string(), repository, syntax);
        }
      }
    }
    vec![]
  }
}
