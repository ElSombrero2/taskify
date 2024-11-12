use taskify::{board, events, task::Task};

use crate::cli::SubCommand;

pub struct ScanController {}

impl ScanController {
  pub fn scan(cmd: &SubCommand) {
    match cmd {
      SubCommand::Scan { path, watch } => {
        let tasks = taskify::task::Task::scan(path.clone());
        println!("Directory scanned! {} tasks added", ScanController::save(tasks, path));
        if *watch {
          println!("File watching is enabled, to stop press CTRL + C");
          events::on_file_change(path.clone(), ScanController::watcher);
        }
      },
      SubCommand::Board { .. } => todo!(), 
    }
  }

  fn watcher (tasks: Vec<Task>, root_directory: &str) {
    println!("Board updated: {} tasks added", ScanController::save(tasks, root_directory));
  }

  fn save (mut tasks: Vec<Task>, path: &str) -> usize {
    let mut board = board::Board::load(path.to_string());
    let task_count = tasks.len();
    board.tasks.append(&mut tasks);
    board.save(path.to_string());
    task_count
  }
}