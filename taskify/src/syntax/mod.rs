use crate::{comment::Comment, info::Info};

pub mod c_based;

pub trait Syntax<T> {
  fn comments(&self, raw_file: String) -> Vec<Comment>;
  fn execute(&self, comment: String, info: Info) -> Option<T>;
}