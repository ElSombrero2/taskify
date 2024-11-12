use serde::{Deserialize, Serialize};

mod string;
mod integer;

#[derive(Debug, Serialize, Deserialize, PartialEq, Eq, Clone)]
pub enum TaskState {
  TODO = 0,
  READY = 1,
  WIP = 2,
  TESTING = 3,
  DONE = 4,
}