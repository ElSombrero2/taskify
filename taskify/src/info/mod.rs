use chrono::DateTime;
use git2::BlameHunk;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Default, Debug, Clone)]
pub struct Author {
  pub name: Option<String>,
  pub email: Option<String>,
}

#[derive(Serialize, Deserialize, Default, Debug, Clone)]
pub struct Info {
  pub filename: String,
  pub start_line: usize,
  pub end_line: usize,
  pub date: Option<String>,
  pub author: Option<Author>,
}

impl Info {
  pub fn new(
    filename: String, (start, end): (usize, usize)
  ) -> Self {
    Info { 
      filename,
      start_line: start,
      end_line: end,
      date: Option::default(),
      author: Option::default()
    }
  }

  pub fn set_detail_from_blame_hunk(&mut self, blame_hunk: Option<BlameHunk>) {
    if let Some(hunk)= blame_hunk {
      let signature = hunk.final_signature();
      self.date = Self::seconds_to_date(signature.when().seconds());
      self.author = Some(Author {
        name: signature.name().map(|s| s.to_string()),
        email: signature.email().map(|s| s.to_string())
      });
    }
  }

  fn seconds_to_date(seconds: i64) -> Option<String> {
    if let Some(date) = DateTime::from_timestamp(seconds, 0) {
      return Some(date.to_string());
    }
    None
  }
}