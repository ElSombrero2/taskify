use std::path::Path;
use git2::{Repository, Error};
use crate::info::Info;

pub fn get_info_from_repository(info: &mut Info, repository: &Result<Repository, Error>) {
  if let Ok(repository) = repository {
    if let Ok(blame) = repository.blame_file(Path::new(&info.filename), None) {
      info.set_detail_from_blame_hunk(blame.get_line(info.start_line));
    }
  }
}