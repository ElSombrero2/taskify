use clap::Parser;
use cli::{controllers::{board::BoardController, scan::ScanController}, Cli};

mod cli;

fn main() {
  let cli = Cli::parse();
  ScanController::scan(&cli.subcommand);
  BoardController::board(&cli.subcommand);
}