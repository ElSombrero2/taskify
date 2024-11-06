use crate::utils;
use regex::Regex;
use serde::{Deserialize, Serialize};
use std::{
  collections::LinkedList, fs::{self, DirEntry}, vec
};

mod common;
pub mod state;

#[derive(Debug, Default, Serialize, Deserialize)]
pub struct Task {
  pub title: String,
  pub description: Option<String>,
  pub state: String,
  pub tags: Vec<String>,
}

impl Task {
  pub fn find_all(filename: String, rewrite: bool) -> Vec<Task> {
    let task = Task::default();
    if let Ok(regex) = Regex::new(
      r"/\*[\s]*\[(TODO|READY|WIP|DONE|TESTING)\]\:[ ]*[[:ascii:]&&[^\*/]]*\*/[\s]*",
    ) {
      if let Ok(file) = fs::read_to_string(&filename) {
        let (vec, str) = utils::regex::capture_all::<Task>(regex, file, task);
        if rewrite && vec.len() > 0 {
          fs::write(filename, str).unwrap();
        }
        return vec;
      }
    }
    vec![]
  }

  pub fn scan(directory: String) -> Vec<Task> {
    let mut tasks: Vec<Task> = vec![];
    let mut stack: LinkedList<String> = LinkedList::new();
    let names = Task::read_ignore_file(directory.clone());
    stack.push_back(directory.clone());
    while stack.len() > 0 {
      if let Some(dir) = stack.pop_back() {
        if let Ok(files) = fs::read_dir(dir) {
          for file in files.flatten() {
            if !Task::is_ignored(&names, &file) {
              tasks.append(&mut Task::get_path(file, &mut stack));
            }
          }
        }
      }
    }
    return tasks;
  }

  fn get_path(file: DirEntry, stack: &mut LinkedList<String>) -> Vec<Task> {
    if let Some(path) = file.path().to_str() {
      if let Ok(file_type) = file.file_type() {
        if file_type.is_dir() {
          stack.push_back(path.to_string());
        } else {
          return Task::find_all(path.to_string(), true);
        }
      }
    }
    return vec![];
  }

  fn read_ignore_file<'a>(directory: String) -> Vec<String> {
    if let Ok(ignored_files) = fs::read_to_string(directory + "/.taskifyignore") {
      let names = ignored_files
        .split("\r\n")
        .map(|s| s.to_string())
        .collect::<Vec<String>>();
      return names;
    }
    return vec![];
  }

  fn is_ignored(names: &Vec<String>, file: &DirEntry) -> bool {
    let filename = file.file_name().to_string_lossy().to_string();
    if filename.contains(".taskify") {
      return true;
    } else {
      for name in names {
        if filename.eq(name) {
            return true;
        }
      }
    }
    return false;
  }
}
