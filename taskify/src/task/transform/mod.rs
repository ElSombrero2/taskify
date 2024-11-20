use base64::{prelude::BASE64_STANDARD, Engine};

use crate::{info::Info, utils::regex::Transform};
use super::{state::TaskState, Task};

impl Transform<Option<Task>> for Task {
  fn transform(&self, raw: String, info: Info) -> Option<Task> {
    let mut sanitized = Task::sanitize(&raw);
    let tags = Task::get_tags(&raw);
    if let Some((state, title)) = Task::get_state_and_title(&sanitized.remove(0)) {
      let description = sanitized.join("\n");
      return Some(Task { 
        title,
        description: if !description.is_empty() { Some(description) } else { None },
        state: TaskState::from(state.as_str()),
        tags,
        info,
        raw: BASE64_STANDARD.encode(raw),
      })
    }
    Option::None
  }
}