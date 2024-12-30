use std::{borrow::BorrowMut, path::Path};
use git2::{Repository, Error};
use crate::info::Info;

pub fn get_info_from_repository(info: &mut Info, repository: &Result<Repository, Error>) {
  if let Ok(repository) = repository {
    let mut path = Path::new(&info.filename);
    let prefix = repository.path().to_str().unwrap_or("").replace(".git/", "");
    
    #[cfg(target_os = "windows")]
    if path.is_absolute() {
      if let Ok(new_path) = path.strip_prefix(prefix) {
        path = new_path;
      }
    }

    #[cfg(target_os = "linux")]
    {
      let mut prefix = prefix;
      prefix.remove(0);
      if let Ok(new_path) = path.strip_prefix(prefix) {
        path = new_path;
      }
    }

    if let Ok(blame) = repository.blame_file(path, None) {
      info.set_detail_from_blame_hunk(blame.get_line(info.start_line));
    }
  }
}