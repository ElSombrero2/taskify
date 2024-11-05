use std::fs;
use regex::Regex;
use crate::utils;
use serde::{Deserialize, Serialize};

pub mod state;
mod common;

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
    if let Ok(regex) = Regex::new(r"/\*[\s]*\[(TODO|READY|WIP|DONE|TESTING)\]\:[ ]*[[:ascii:]&&[^\*/]]*\*/[\s]*") {
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
}

