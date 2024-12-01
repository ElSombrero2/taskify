mod regex;
mod utils;

pub struct CBased {
  pub states: String,
}

impl CBased {
  pub fn new (states: String) -> Self {
    Self { states }
  }
}