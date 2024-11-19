use std::env;

pub fn current_filename() -> String {
  if let Ok(current_dir) = env::current_dir() {
    if let Some(filename) = current_dir.file_name() {
      return filename.to_string_lossy().to_string();
    }
  }
  String::from("Unknown")
}