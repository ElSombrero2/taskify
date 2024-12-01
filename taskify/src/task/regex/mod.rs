use std::fs;
use git2::{Repository, Error};
use crate::{info::Info, syntax::Syntax, utils::{file::{get_line, sanitize_path}, git::get_info_from_repository}};
use super::Task;

impl Task {
  pub fn match_regex(filename: String, repository: &Result<Repository, Error>, syntax: &impl Syntax<Task>) -> Vec<Task> {
    let mut comments: Vec<Task> = vec![];
    if let Ok(raw_file) = fs::read_to_string(&filename) {
      let regex = syntax.regex();
      for exp in regex.find_iter(&raw_file) {
        let mut info = Info::new(
          sanitize_path(filename.clone()),
          (
            get_line(&raw_file, exp.start() + 1),
            get_line(&raw_file, exp.end()),
          )
        );
        get_info_from_repository(&mut info, repository);
        if let Some(task) = syntax.execute(String::from(exp.as_str()), info) {
          comments.push(task);
        }
      }
    }
    comments
  }
}
