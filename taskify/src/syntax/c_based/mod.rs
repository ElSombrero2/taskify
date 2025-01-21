use crate::task::state::STATES;

mod matcher;
mod utils;

pub struct CBased {
  pub states: String,
}

impl CBased {
  pub fn new () -> Self {
    Self { states: STATES.into() }
  }
}

impl Default for CBased {
  fn default() -> Self {
    Self::new()
  }
}

