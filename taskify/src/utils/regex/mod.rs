use std::path::Path;

use git2::{Repository, Error};
use regex::Regex;

use crate::info::Info;

pub trait Transform<T> {
  fn transform(&self, str: String, file: Info) -> T;
}

pub fn match_all<T>(regex: Regex, str: String, transf: impl Transform<Option<T>>, filename: String, repository: &Result<Repository, Error>) -> (Vec<T>, String) {
  let mut strs: Vec<T> = vec![];
  for exp in regex.find_iter(&str) {
    let mut info = Info::new(
      sanitize_path(filename.clone()),
      (
        get_line(&str, exp.start() + 1),
        get_line(&str, exp.end()),
      )
    );
    get_info_from_repository(&mut info, repository);
    if let Some(result) = transf.transform(String::from(exp.as_str()), info) {
      strs.push(result);
    }
  }
  (strs, String::from(regex.replace_all(&str, "")))
}

fn get_line(str: &str, pointer: usize) -> usize{
  let substr = &str[..pointer];
  return substr.lines().count();
}

fn get_info_from_repository(info: &mut Info, repository: &Result<Repository, Error>) {
  if let Ok(repository) = repository {
    if let Ok(blame) = repository.blame_file(Path::new(&info.filename), None) {
      info.set_detail_from_blame_hunk(blame.get_line(info.start_line));
    }
  }
}

fn sanitize_path (mut file_path: String) -> String {
  let regex = Regex::new(r"^(\.|/|\\)").unwrap();
  while regex.is_match(&file_path) {
    file_path.remove(0);
  }
  file_path
}
