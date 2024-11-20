use clap::{Parser, Subcommand};
use taskify::task::state::TaskState;

pub mod controllers;

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
  pub subcommand: SubCommand,
}

#[derive(Subcommand)]
pub enum SubCommand {
  /// Show your board from your current directory
  Board {
    #[arg(long, short = 'e')]
    export: Option<String>
  },
  /// Create a server that serve your board (Work in Progress)
  Serve {
    #[arg(long, short = 'p', default_value = "8000")]
    port: u16,
  },
  Remove {
    #[arg(long, short = 'f')]
    file: String,
    #[arg(long, short = 'r')]
    raw: String,
  },
  Move {
    #[arg(long, short = 'f')]
    file: String,
    #[arg(long, short = 'r')]
    raw: String,
    #[arg(long, short = 's')]
    from: TaskState,
    #[arg(long, short = 't')]
    to: TaskState,
  }
}