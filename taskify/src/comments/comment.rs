use regex::Regex;

use crate::utils::regex::Transform;

#[derive(Debug, Default)]
pub struct Comment {
  pub title: Option<String>,
  pub description: Option<String>,
}

impl Transform<Comment> for Comment {
  fn transform(&self, str: String) -> Comment {
    let sanitized = Regex::new(r"(/\*)|(\*/)").unwrap().replace_all(&str, "").to_string();
    let mut res = sanitized.split("\r\n").filter_map(|s| {
      let str = s.trim();
      if str.eq("") {
        return None;
      }
      Some(String::from(str))
    }).collect::<Vec<String>>();
    let title = Some(res.remove(0));
    let description = res.join("\r\n");
    Comment { 
      title,
      description: if description.len() > 0 { Some(description) } else { Option::None }, 
    }
  }
}