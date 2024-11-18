use std::fmt::Display;

use super::TaskState;

impl Display for TaskState {
  
  fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
    match self {
      TaskState::TODO => write!(f, "Todo"),
      TaskState::READY => write!(f, "Ready"),
      TaskState::WIP => write!(f, "Work in Progress"),
      TaskState::TESTING => write!(f, "Testing"),
      TaskState::DONE => write!(f, "Done"),
    }
  }
}

impl From<&str> for TaskState {
  fn from(value: &str) -> Self {
    match value {
      "TODO" => Self::from(0),
      "READY" => Self::from(1),
      "WIP" => Self::from(2),
      "TESTING" => Self::from(3),
      "DONE" => Self::from(4),
      _ => Self::from(0),
    }
  }
}