use clap::Parser;
use cli::{controllers::board::BoardController, Cli};
use taskify::{syntax::c_based::CBased, task::state::STATES};

mod cli;

fn main() {
  let cli = Cli::parse();
  match cli.subcommand {
    cli::SubCommand::Board { export, path } => {
      let syntax = CBased::new(STATES.to_string());
      if let Some(filename) = export { BoardController::export(filename, path, syntax); }
      else { BoardController::show(path, syntax); }
    },
    cli::SubCommand::Remove { file, raw } => BoardController::remove(file, raw),
    cli::SubCommand::Move { file, raw, from, to } => BoardController::move_task(file, raw, from, to),
    cli::SubCommand::Serve { port } => {
      api::server::serve(port);
    }
  }
}