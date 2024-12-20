use clap::Parser;
use cli::{controllers::board::BoardController, Cli};
use taskify::syntax::c_based::CBased;

mod cli;

fn main() {
  let cli = Cli::parse();
  match cli.subcommand {
    cli::SubCommand::Board { export, path } => {
      let syntax = CBased::new();
      if let Some(filename) = export { BoardController::export(filename, path, syntax); }
      else { BoardController::show(path, syntax); }
    },
    cli::SubCommand::Remove { file, id } => BoardController::remove(file, id),
    cli::SubCommand::Move { file, id, from, to } => BoardController::move_task(file, id, from, to),
    cli::SubCommand::Serve { port } => {
      api::server::serve(port);
    }
  }
}
