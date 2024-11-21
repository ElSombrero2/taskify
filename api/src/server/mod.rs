use actix_web::{App, HttpServer};
use controller::board::board_controller;
use docs::ApiDoc;
use utoipa::OpenApi;
use utoipa_actix_web::AppExt;
use utoipa_scalar::{Scalar, Servable};

mod controller;
mod docs;

#[actix_web::main]
pub async fn serve(port: u16) {
  if let Ok(server) = HttpServer::new(|| {
    App::new()
    .service(board_controller::find_board)
    .service(board_controller::change_state)
    .service(board_controller::remove_task)
    .into_utoipa_app()
    .openapi(ApiDoc::openapi())
    .openapi_service(|api| Scalar::with_url("/", api))
    .into_app()
  }).bind(("127.0.0.1", port)) {
    println!("Your server is running on http://127.0.0.1:{}", port);
    server.run().await.unwrap_or_else(|_| {
      println!("Cannot start your server, please try again!");
    });

  } else {
    println!("An error occurred in when you instantiate your server,\nplease try again with another port.");
  }
}