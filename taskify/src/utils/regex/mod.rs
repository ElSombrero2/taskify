use regex::Regex;

pub trait Transform<T> {
  fn transform(&self, str: String) -> T;
}

pub fn capture_all<T>(regex: Regex, str: String, transf: impl Transform<Option<T>>) -> (Vec<T>, String) {
  let mut strs: Vec<T> = vec![];
  for exp in regex.find_iter(&str) {
    if let Some(result) = transf.transform(String::from(exp.as_str())) {
      strs.push(result);
    }
  }
  (strs, String::from(regex.replace_all(&str, "")))
}
