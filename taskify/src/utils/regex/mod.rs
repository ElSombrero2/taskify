use regex::Regex;

pub trait Transform<T> {
  fn transform(&self, str: String) -> T;
}

pub fn capture_all<T>(regex: Regex, str: String, transf: impl Transform<T>) -> (Vec<T>, String) {
  let mut strs: Vec<T> = vec![];
  for exp in regex.find_iter(&str) {
    strs.push(transf.transform(String::from(exp.as_str())));
  }
  (strs, String::from(regex.replace_all(&str, "")))
}
