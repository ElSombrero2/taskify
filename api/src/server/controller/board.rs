pub mod board_controller {
  use actix_web::{get, http::StatusCode, put, web::{Json, Query}, Responder};
  use taskify::{board::Board, task::state::TaskState};
  use crate::server::controller::types::{message::MessageDTO, query::BoardQuery, task::{MoveTaskDTO, RemoveTaskDTO}};

  #[utoipa::path(
    get,
    tag = "Board",
    description = "Find all your TODO comment from your file directories",
    path = "/board",
    params(
      ("path" = Option<BoardQuery>, Query, description = "Path of the directory that you want to get your board")
    ),
    responses(
     (status = 200, body = Board, description = "Success response") 
    ))
  ]
  #[get("/board")]
  pub async fn find_board (query: Query<BoardQuery>) -> impl Responder {
    let board = Board::load(query.path.to_owned().unwrap_or(".".into()));
    (Json(board), StatusCode::OK)
  }

  #[utoipa::path(
    put,
    tag = "Board",
    path = "/task/remove",
    description = "Remove a task from the board.",
    responses(
     (status = 200, body = MessageDTO, description = "Success response"),
     (status = 403, body = MessageDTO, description = "Error response"),
    ))
  ]
  #[put("/task/remove")]
  pub async fn remove_task (body: Json<RemoveTaskDTO>) -> impl Responder {
    if Board::remove_task(body.file.clone(), body.raw.clone()) {
      return (Json(MessageDTO {
        message: "Task removed".to_string(),
        status: 200
      }), StatusCode::OK);
    }
    (Json(MessageDTO {
      message: "An error occurred, please check your filename and raw!".to_string(),
      status: 403
    }), StatusCode::FORBIDDEN)
  }

  #[utoipa::path(
    put,
    tag = "Board",
    path = "/task/move",
    description = "Move a task inside the board (Change his state).",
    responses(
      (status = 200, body = MessageDTO, description = "Success response"),
      (status = 403, body = MessageDTO, description = "Error response"),
    ))
  ]
  #[put("/task/move")]
  pub async fn change_state (body: Json<MoveTaskDTO>) -> impl Responder {
    if Board::change_state(
      body.file.clone(),
      body.raw.clone(),
      TaskState::from(body.from.as_str()),
      TaskState::from(body.to.as_str())
    ) {
      return (Json(MessageDTO {
        message: format!("Task state changed from {} to {}", &body.from, &body.to),
        status: 200
      }), StatusCode::OK);
    }
    (Json(MessageDTO {
      message: "An error occurred, please check your filename and raw!".to_string(),
      status: 403
    }), StatusCode::FORBIDDEN)
  }
}