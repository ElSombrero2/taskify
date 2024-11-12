use clap::{Parser, Subcommand};

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
  /// Command that scan directory, use 
  /// {n}taskify scan --help
  /// {n}command for more information
  Scan {
    /// Path of your directory
    path: String,
    /// Watch file changes inside the current directory
    #[arg(long, short = 'w', action)]
    watch: bool,
  },
  // Command that for the board 
  Board {
    #[arg(long, short = 's', action)]
    show: bool,
    #[arg(long, short = 'r', action)]
    remove: bool,
  }
}