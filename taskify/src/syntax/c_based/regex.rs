use base64::{prelude::BASE64_STANDARD, Engine};
use regex::Regex;
use crate::{info::Info, syntax::Syntax, task::{state::TaskState, Task}, utils::markdown};
use super::{utils::{get_state_and_title, get_tags, sanitize}, CBased};

impl  CBased {
  pub fn inline_regex(&self) -> String {
    format!(r"(/\*[\s]*\[({})\]\:[ ]*[[:ascii:]&&[^/]]*\*/[\s]*)", self.states)
  }

  pub fn multiline_regex(&self) -> String {
    let states = &self.states;
    format!(r"(//[ ]((\[({states})\]\:)|({states})))[ ][[:ascii:]&&[^\n\r]]*")
  }
}

impl Syntax<Task> for CBased {
  fn execute(&self, raw: String, mut info: Info) -> Option<Task> {
    let mut sanitized = sanitize(&raw);
    let tags = get_tags(&raw);
    if let Some((state, title)) = get_state_and_title(&sanitized.remove(0), raw.starts_with("//")) {
      let description = sanitized.join("\n");
      info.attached_files = Some(markdown::get_files(&description));
      return Some(Task::new( 
        title,
        if !description.is_empty() { Some(description) } else { None },
        TaskState::from(state.as_str()),
        tags,
        info,
        BASE64_STANDARD.encode(raw),
      ))
    }
    Option::None
  }
  
  fn regex(&self) -> regex::Regex {
    Regex::new(
      &format!(r"(?m){}|{}", self.multiline_regex(), self.inline_regex()),
    ).expect("An error occurred with the current regex")
  }
}