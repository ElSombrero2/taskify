use std::fs::{self, DirEntry};
use super::Task;

impl Task {
  pub fn read_ignore_file(directory: String) -> Vec<String> {
    if let Ok(ignored_files) = fs::read_to_string(directory + "/.taskifyignore") {
      let names = ignored_files
        .split("\r\n")
        .map(|s| s.to_string())
        .collect::<Vec<String>>();
      return names;
    }
    vec![]
  }

  pub fn is_ignored(names: &Vec<String>, file: &DirEntry) -> bool {
    let filename = file.file_name().to_string_lossy().to_string();
    if filename.contains(".git") {
      return true;
    } else {
      for name in names {
        if name.contains(&filename) {
          return true;
        }
      }
    }
    false
  }
}