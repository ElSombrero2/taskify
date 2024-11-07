
use clap::Parser;
use scan::Scan;

pub mod controllers;
pub mod scan;
///{n}
///_____                 _      _    __               _
///{n}|_   _|   __ _   ___  | | __ (_)  / _|  _   _      (_)   ___
///{n}  | |    / _` | / __| | |/ / | | | |_  | | | |     | |  / _ \
///{n}  | |   | (_| | \__ \ |   <  | | |  _| | |_| |  _  | | | (_) |
///{n}  |_|    \__,_| |___/ |_|\_\ |_| |_|    \__, | (_) |_|  \___/
///{n}                                        |___/
/// 
/// Welcome to Taskify CLI.
/// {n}Visit https://github.com/ElSombrero2/taskify
#[derive(Parser)]
#[command(version = "0.1.0")]
pub struct Cli {
  #[command(subcommand)]
  pub scan: Scan,
}