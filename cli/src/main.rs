use clap::Parser;
use cli::{controllers::board::BoardController, Cli};

mod cli;

fn main() {
  let cli = Cli::parse();
  match cli.subcommand {
    cli::SubCommand::Board { export} => {
      if let Some(filename) = export { BoardController::export(filename); }
      else { BoardController::show(); }
    },
    cli::SubCommand::Serve { .. } => println!("<Work in progress>"),
  }
}