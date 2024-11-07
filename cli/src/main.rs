use clap::Parser;
use cli::{controllers::scan::ScanController, Cli};

mod cli;

fn main() {
  let cli = Cli::parse();
  ScanController::scan(&cli.scan);
}