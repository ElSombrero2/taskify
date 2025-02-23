use regex::Regex;
use crate::info::AttachedFile;

use super::http::file_info::get_file_info_from_url;

pub fn get_files(str: &str) -> Vec<AttachedFile> {
  let regex = Regex::new(r"\[[A-Za-z0-9\- ]+\]\([[:ascii:]&&[^\s]]*\)").unwrap();
  let replacement_regex = Regex::new(r"[\(\)\[\]]").unwrap();
  let mut files: Vec<AttachedFile> = vec![];
  for elem in regex.find_iter(str) {
    let splited = elem.as_str().split("(").collect::<Vec<&str>>();
    let name = replacement_regex.replace_all(splited[0], "").to_string();
    let url = replacement_regex.replace_all(splited[1], "").to_string();
    if let Some((mime_type, size)) =  get_file_info_from_url(&url) {
      files.push(AttachedFile { name, url, size, mime_type });
    }
  }
  files
}