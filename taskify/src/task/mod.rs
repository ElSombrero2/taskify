use std::fs;
use task::Task;
use regex::Regex;
use crate::utils;

pub mod task;
pub mod state;

pub fn find_all(filename: String) -> Vec<Task> {
  let task = Task::default();
  if let Ok(regex) = Regex::new(r"/\*[\s]*\[(TODO|READY|WIP|DONE|TESTING)\]\:[ ]*[[:ascii:]&&[^\*/]]*\*/[\s]*") {
    if let Ok(file) = fs::read_to_string(&filename) {
      let (vec, str) = utils::regex::capture_all::<Task>(regex, file, task);
      fs::write(filename, str).unwrap();
      return vec;
    }
  }
  vec![]
}