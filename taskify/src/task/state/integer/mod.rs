use super::TaskState;

impl TaskState {
  pub fn to_integer(&self) -> u16 {
    match self {
      TaskState::TODO => 0,
      TaskState::READY => 1,
      TaskState::WIP => 2,
      TaskState::TESTING => 3,
      TaskState::DONE => 4,
    }
  }
}

impl From<u8> for TaskState {
  fn from(value: u8) -> TaskState {
    match value {
      0 => TaskState::TODO,
      1 => TaskState::READY,
      2 => TaskState::WIP,
      3 => TaskState::TESTING,
      4 => TaskState::DONE,
      _ => TaskState::TODO,
    }
  }
}

impl Default for TaskState {
  fn default() -> Self {
    Self::TODO
  }
}

impl PartialOrd for TaskState {
  fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
    Some(self.to_integer().cmp(&other.to_integer()))
  }
}

impl Ord for TaskState {  
  fn cmp(&self, other: &Self) -> std::cmp::Ordering {
    self.to_integer().cmp(&other.to_integer())
  }
}