use std::fs;
use comment::Comment;
use regex::Regex;
use crate::utils;

pub mod comment;

pub fn get_all_comments(filename: String) -> Vec<Comment> {
  let comment = Comment::default();
  if let Ok(regex) = Regex::new(r"/\*[\s]*\[(TODO|READY|WIP|DONE|TESTING)\]\:[ ]*[\s\w\d\p{Punctuation}&&[^(\*/)]]*\*/[\s]*") {
    if let Ok(file) = fs::read_to_string(&filename) {
      let (vec, str) = utils::regex::capture_all::<Comment>(regex, file, comment);
      fs::write(filename, str).unwrap();
      return vec;
    }
  }
  vec![]
}