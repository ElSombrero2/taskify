use regex::Regex;

use crate::info::Info;

pub mod c_based;

pub trait Syntax<T> {
  fn regex(&self) -> Regex;
  fn execute(&self, raw: String, info: Info) -> Option<T>;
}