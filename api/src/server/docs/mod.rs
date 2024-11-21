use utoipa::OpenApi;
use super::controller::board::board_controller;

#[derive(OpenApi)]
#[openapi(
  info(
    title = "Taskify",
    description = "Taskify tool REST API documentation.",
  ),
  tags(
    (name = "board", description = "You can find here all the methods according to the KANBAN Board.")
  ),
  paths(
    board_controller::find_board,
    board_controller::remove_task,
    board_controller::change_state
  )
)]
pub struct ApiDoc;