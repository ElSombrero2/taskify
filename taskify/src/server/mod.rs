use actix_web::{App, HttpServer};
use controller::board::board_controller;

mod controller;

#[actix_web::main]
pub async fn serve(port: u16) {
  if let Ok(server) = HttpServer::new(|| {
    App::new()
    .service(board_controller::find_board)
  }).bind(("127.0.0.1", port)) {
    println!("Your server is running on http://127.0.0.1:{}", port);
    println!("/board [Returns your board]");
    server.run().await.unwrap_or_else(|_| {
      println!("Cannot start your server, please try again!");
    });

  } else {
    println!("An error occurred in when you instantiate your server,\nplease try again with another port.");
  }
}