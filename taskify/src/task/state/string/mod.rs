use super::TaskState;

impl ToString for TaskState {
  fn to_string(&self) -> String {
    match self {
      TaskState::TODO => "Todo".to_string(),
      TaskState::READY => "Ready".to_string(),
      TaskState::WIP => "Work in Progress".to_string(),
      TaskState::TESTING => "Testing".to_string(),
      TaskState::DONE => "Done".to_string(),
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