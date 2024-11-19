use std::path::Path;

use git2::Repository;

use crate::{info::Info, utils::regex::Transform};
use super::{state::TaskState, Task};

impl Transform<Option<Task>> for Task {
  fn transform(&self, str: String, mut info: Info) -> Option<Task> {
    let mut sanitized = Task::sanitize(&str);
    let tags = Task::get_tags(&str);
    get_info_from_repository(&mut info);
    if let Some((state, title)) = Task::get_state_and_title(&sanitized.remove(0)) {
      let description = sanitized.join("\n");
      return Some(Task { 
        title,
        description: if !description.is_empty() { Some(description) } else { None },
        state: TaskState::from(state.as_str()),
        tags,
        info,
      })
    }
    Option::None
  }
}

fn get_info_from_repository(info: &mut Info) {
  if let Ok(repository) = Repository::open(".") {
    if let Ok(blame) = repository.blame_file(Path::new(&info.filename), None) {
      info.set_detail_from_blame_hunk(blame.get_line(info.start_line));
    }
  }
}