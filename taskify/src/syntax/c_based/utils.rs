use regex::Regex;

pub fn sanitize(str: &str) -> Vec<String> {
  let sanitizer_regex = Regex::new(r"(/\*)|(\*/)|\r|(//)")
  .unwrap().replace_all(str.trim(), "").to_string();
  
  let mut res = sanitizer_regex.split('\n').filter_map(|s| {
    let str = s.trim();
    Some(String::from(str))
  }).collect::<Vec<String>>();
  while res[0].eq("") {
     res.remove(0);
  }

  res
}

pub fn get_tags (str: &str) -> Vec<String> {
  let mut tags = vec![];
  let tags_regex = Regex::new(r"#[\w\d]+").unwrap();
  
  for tag in tags_regex.find_iter(str) {
    tags.push(tag.as_str().replace('#', ""));
  }
  tags
}

pub fn get_state_and_title(title: &str, is_inline: bool) -> Option<(String, String)> {
  let splitted = title.split("]: ").collect::<Vec<&str>>();
  
  if splitted.len() < 2 {
    if is_inline {
      let mut splitted = title.split(" ").collect::<Vec<&str>>();
      return Some((splitted.remove(0).to_string(), splitted.join(" ")));
    }
    return None;
  }
  Some((splitted[0].replace('[', ""), splitted[1].to_string()))
}