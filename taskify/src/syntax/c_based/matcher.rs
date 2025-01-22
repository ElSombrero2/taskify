use base64::{prelude::BASE64_STANDARD, Engine};
use regex::Regex;
use crate::{comment::Comment, info::Info, syntax::Syntax, task::{state::TaskState, Task}, utils::{file::get_line, markdown}};
use super::{utils::{get_state_and_title, get_tags, sanitize}, CBased};

impl CBased {
  fn get_inline_comments (&self, raw_file: &str) -> Vec<Comment> {
    let mut comments: Vec<Comment> = vec![];

    let states = &self.states;
    
    let regex = Regex::new(&format!(r"(//[ ]((\[({states})\])|({states}))\:?)[ ][[:ascii:]&&[^\n\r]]*")).unwrap();

    for expr in regex.find_iter(raw_file) {
      let line = get_line(raw_file, expr.start());
      comments.push(Comment { 
        raw: expr.as_str().to_string(),
        start_line: line,
        end_line: line
      });
    }

    return comments;
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

  // Improve the performance of this code
  // for finding the start and end line of the comment
  // inside the code
  fn comments(&self, raw_file: String) -> Vec<Comment> {
    let files = raw_file.split("/*");
    let mut comments: Vec<Comment> = vec![];
    let mut inline_comments = self.get_inline_comments(&raw_file);
    comments.append(&mut inline_comments);

    for file in files {
      if let Some(end) = file.find("*/") {
        let comment = format!("/*{}", file[..end + 2].to_string());
        if let Some(start) = raw_file.find(&comment) {
          comments.push(Comment {
            start_line: get_line(&raw_file, start),
            end_line: get_line(&raw_file, start + end),
            raw: comment,
          });
        }
      }
    }

    return comments;   
  }
}