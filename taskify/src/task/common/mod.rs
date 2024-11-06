use crate::utils::regex::Transform;
use regex::Regex;
use super::Task;

impl Task {
  fn sanitize(str: &String) -> Vec<String> {
    let sanitizer_regex = Regex::new(r"(/\*)|(\*/)").unwrap().replace_all(&str, "").to_string();
    sanitizer_regex.split("\r\n").filter_map(|s| {
      let str = s.trim();
      if str.eq("") {
        return None;
      }
      Some(String::from(str))
    }).collect::<Vec<String>>()
  }

  fn get_tags (str: &String) -> Vec<String> {
    let mut tags = vec![];
    let tags_regex = Regex::new(r"#[\w\d]+").unwrap();
    for tag in tags_regex.find_iter(str) {
      tags.push(tag.as_str().replace("#", ""));
    }
    return tags;
  }

  fn get_state_and_title(title: &String) -> Option<(String, String)> {
    let splitted = title.split("]: ").collect::<Vec<&str>>();
    if splitted.len() < 2 {
      return None;
    }
    Some((splitted[0].replace("[", ""), splitted[1].to_string()))
  }
}

impl Transform<Option<Task>> for Task {
  fn transform(&self, str: String) -> Option<Task> {
    let mut sanitized = Task::sanitize(&str);
    let tags = Task::get_tags(&str);
    if let Some((state, title)) = Task::get_state_and_title(&sanitized.remove(0)) {
      let description = sanitized.join("\r\n");
      return Some(Task { 
        title: title,
        description: if description.len() > 0 { Some(description) } else { None },
        state,
        tags,
      })
    }
    return Option::None;
  }
}