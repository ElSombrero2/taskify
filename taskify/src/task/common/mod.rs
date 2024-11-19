use regex::Regex;
use super::Task;

impl Task {
  pub fn sanitize(str: &str) -> Vec<String> {
    let sanitizer_regex = Regex::new(r"(/\*)|(\*/)|\r").unwrap().replace_all(str, "").to_string();
    sanitizer_regex.split('\n').filter_map(|s| {
      let str = s.trim();
      if str.eq("") {
        return None;
      }
      Some(String::from(str))
    }).collect::<Vec<String>>()
  }

  pub fn get_tags (str: &str) -> Vec<String> {
    let mut tags = vec![];
    let tags_regex = Regex::new(r"#[\w\d]+").unwrap();
    for tag in tags_regex.find_iter(str) {
      tags.push(tag.as_str().replace('#', ""));
    }
    tags
  }

  pub fn get_state_and_title(title: &str) -> Option<(String, String)> {
    let splitted = title.split("]: ").collect::<Vec<&str>>();
    if splitted.len() < 2 {
      return None;
    }
    Some((splitted[0].replace('[', ""), splitted[1].to_string()))
  }
}