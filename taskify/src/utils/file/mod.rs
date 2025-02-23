use std::env;

use regex::Regex;

pub fn current_filename() -> String {
  if let Ok(current_dir) = env::current_dir() {
    if let Some(filename) = current_dir.file_name() {
      return filename.to_string_lossy().to_string();
    }
  }
  String::from("Unknown")
}

pub fn get_line(str: &str, pointer: usize) -> usize {
  let substr = &str[..pointer];
  return substr.lines().count();
}

pub fn sanitize_path (mut file_path: String) -> String {
  let regex = Regex::new(r"^(\.|/|\\)").unwrap();
  while regex.is_match(&file_path) {
    file_path.remove(0);
  }
  file_path
}
