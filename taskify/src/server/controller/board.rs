pub mod board_controller {
  use actix_web::{get, web, Responder, Result};
  use crate::board::Board;

  #[get("/board")]
  pub async fn find_board () -> Result<impl Responder> {
    let board = Board::load(".".to_string());
    Ok(web::Json(board))
  }
}