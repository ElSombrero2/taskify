use clap::Parser;
use cli::{controllers::board::BoardController, Cli};
use taskify::server;

mod cli;

fn main() {
  let cli = Cli::parse();
  match cli.subcommand {
    cli::SubCommand::Board { export} => {
      if let Some(filename) = export { BoardController::export(filename); }
      else { BoardController::show(); }
    },
    cli::SubCommand::Remove { file, raw } => BoardController::remove(file, raw),
    cli::SubCommand::Move { file, raw, from, to } => BoardController::move_task(file, raw, from, to),
    cli::SubCommand::Serve { port } => {
      server::serve(port);
    }
  }
}