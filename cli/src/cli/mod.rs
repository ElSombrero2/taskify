use clap::{Parser, Subcommand};
use taskify::task::state::TaskState;

pub mod controllers;
pub mod ui;

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
  /// Show your board from your current directory.
  Board {
    #[arg(long, short = 'p')]
    path: Option<String>,
    #[arg(long, short = 'e')]
    export: Option<String>
  },
  /// Create a server that serve your board
  Serve {
    #[arg(long, short = 'p', default_value = "8000")]
    port: u16,
  },
  /// Remove a TODO comment inside your file
  Remove {
    /// Your file name.
    #[arg(long, short = 'f')]
    file: String,
    /// Raw is an unique base64 String that match your comment
    #[arg(long)]
    id: String,
  },
  /// Change the state of your task
  Move {
    /// Your file name.
    #[arg(long, short = 'f')]
    file: String,
    /// Id is an unique base64 String that match your comment
    #[arg(long)]
    id: String,
    /// Your current task State, possible value (TODO, READY, WIP, DONE, TESTING)
    #[arg(long, short = 's')]
    from: TaskState,
    /// Your target task State, possible value (TODO, READY, WIP, DONE, TESTING)
    #[arg(long, short = 't')]
    to: TaskState,
  },
  /// CLI UI (Beta)
  UI,
}