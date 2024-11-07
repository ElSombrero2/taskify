use clap::Subcommand;

#[derive(Subcommand)]
pub enum Scan {
  /// Command that scan directory, use 
  /// {n}taskify scan --help
  /// {n}command for more information
  Scan {
    /// Path of your directory
    path: String,
    /// Watch file changes inside the current directory
    #[arg(long, short = 'w', action)]
    watch: bool,
  }
}