use crate::{info::Info, utils};
use git2::{Error, Repository};
use regex::Regex;
use serde::{Deserialize, Serialize};
use state::TaskState;
use utoipa::ToSchema;
use std::{collections::LinkedList, fs::{self, DirEntry}, vec};

mod common;
pub mod state;
pub mod transform;
pub mod ignore;

#[derive(Debug, Default, Serialize, Deserialize, Clone, ToSchema)]
pub struct Task {
  pub title: String,
  pub description: Option<String>,
  pub state: TaskState,
  pub tags: Vec<String>,
  pub info: Info,
  pub raw: String,
}

impl Task {
  pub fn scan(directory: String) -> Vec<Task> {
    let mut tasks: Vec<Task> = vec![];
    let mut stack: LinkedList<String> = LinkedList::new();
    let names = Task::read_ignore_file(directory.clone());
    let repos = Repository::open(".");
    stack.push_back(directory.clone());
    while !stack.is_empty() {
      if let Some(dir) = stack.pop_back() {
        if let Ok(files) = fs::read_dir(dir.clone()) {
          for file in files.flatten() {
            if !Task::is_ignored(&names, &file) {
              tasks.append(&mut Task::get_path(file, &mut stack, &repos));
            }
          }
        }
      }
    }
    tasks
  }

  fn get_path(file: DirEntry, stack: &mut LinkedList<String>, repository: &Result<Repository, Error>) -> Vec<Task> {
    if let Some(path) = file.path().to_str() {
      if let Ok(file_type) = file.file_type() {
        if file_type.is_dir() {
          stack.push_back(path.to_string());
        } else {
          return Task::match_regex(path.to_string(), false, repository);
        }
      }
    }
    vec![]
  }

  pub fn match_regex(filename: String, rewrite: bool, repository: &Result<Repository, Error>) -> Vec<Task> {
    let task = Task::default();
    if let Ok(regex) = Regex::new(
      r"(?m)/\*[\s]*\[(TODO|READY|WIP|DONE|TESTING)\]\:[ ]*[[:ascii:]&&[^\*/]]*\*/[\s]*",
    ) {
      if let Ok(file) = fs::read_to_string(&filename) {

        let (vec, str) = utils::regex::match_all::<Task>(regex, file, task, filename.clone(), repository);
        if rewrite && !vec.is_empty() {
          fs::write(filename, str).unwrap();
        }
        return vec;
      }
    }
    vec![]
  }
}
