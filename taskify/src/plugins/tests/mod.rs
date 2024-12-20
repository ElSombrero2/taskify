pub mod mock;

#[cfg(test)]
mod test {
  use crate::{board::Board, plugins::{load_script, tests::mock::__MOCK_JSON__}, task::state::TaskState};

  #[tokio::test]
  async fn capitalize() {
    let board = serde_json::from_str::<Board>(__MOCK_JSON__).unwrap();
    let new_board = load_script("./src/plugins/tests/mock/capitalize/index.js", board).await;
    assert!(new_board.name.eq("Taskify"));
  }

  #[tokio::test]
  async fn filter() {
    let board = serde_json::from_str::<Board>(__MOCK_JSON__).unwrap();
    let new_board = load_script("./src/plugins/tests/mock/filter/index.js", board).await;
    assert!(!new_board.tasks.iter().any(|t| t.state == TaskState::TODO));
  }

  #[tokio::test]
  async fn extra() {
    let board = serde_json::from_str::<Board>(__MOCK_JSON__).unwrap();
    let new_board = load_script("./src/plugins/tests/mock/extra/index.js", board).await;

    assert!(new_board.extra.is_some());
    assert!(new_board.extra.as_ref().unwrap().get("name").is_some());
    assert!(new_board.extra.as_ref().unwrap().get("name").unwrap().is_string());
    assert!(new_board.extra.as_ref().unwrap().get("name").unwrap().as_str().eq(&Some("Extra Name")));
  }

  #[tokio::test]
  async fn with_packages() {
    let board = serde_json::from_str::<Board>(__MOCK_JSON__).unwrap();
    let new_board = load_script("./src/plugins/tests/mock/file/index.js", board).await;
    
    assert!(new_board.extra.is_some());
    assert!(new_board.extra.as_ref().unwrap().get("name").is_some());
    assert!(new_board.extra.as_ref().unwrap().get("name").unwrap().is_string());
    assert!(new_board.extra.as_ref().unwrap().get("name").unwrap().as_str().eq(&Some("taskify-desktop")));
  }
}