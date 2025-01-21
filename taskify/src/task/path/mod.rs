use std::fs;
use git2::{Repository, Error};
use crate::{info::Info, syntax::Syntax, utils::{file::sanitize_path, git::get_info_from_repository}};
use super::Task;

impl Task {
  pub fn from_path(filename: String, repository: &Result<Repository, Error>, syntax: &impl Syntax<Task>) -> Vec<Task> {
    let mut comments: Vec<Task> = vec![];
    if let Ok(raw_file) = fs::read_to_string(&filename) {
      for comment in syntax.comments(raw_file){
        let mut info = Info::new(
          sanitize_path(filename.clone()),
          (comment.start_line, comment.end_line)
        );
        get_info_from_repository(&mut info, repository);
        if let Some(task) = syntax.execute(comment.raw, info) {
          comments.push(task);
        }
      }
    }
    comments
  }
}
