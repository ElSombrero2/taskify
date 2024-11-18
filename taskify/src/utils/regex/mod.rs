use regex::Regex;

pub trait Transform<T> {
  fn transform(&self, str: String) -> T;
}

pub fn capture_all<T>(regex: Regex, str: String, transf: impl Transform<Option<T>>, filename: String) -> (Vec<T>, String) {
  let mut strs: Vec<T> = vec![];
  for exp in regex.find_iter(&str) {
    if let Some(result) = transf.transform(String::from(exp.as_str())) {
      strs.push(result);
    }
  }
  (strs, String::from(regex.replace_all(&str, "")))
}

fn get_line(str: &str, pointer: usize) -> usize{
  let substr = &str[..pointer];
  return substr.lines().count();
}
