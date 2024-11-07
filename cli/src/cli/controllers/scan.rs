use taskify::{board, events, task::Task};

use crate::cli::Scan;

pub struct ScanController {}

impl ScanController {
  pub fn scan(scan: &Scan) {
    match scan {
      Scan::Scan { path, watch } => {
        let tasks = taskify::task::Task::scan(path.clone());
        println!("Directory scanned! {} tasks added", ScanController::save(tasks, &path));
        if *watch {
          println!("File watching is enabled, to stop press CTRL + C");
          events::on_file_change(path.clone(), ScanController::watcher);
        }
      },
    }
  }

  fn watcher (tasks: Vec<Task>, root_directory: &String) {
    println!("Board updated: {} tasks added", ScanController::save(tasks, root_directory));
  }

  fn save (mut tasks: Vec<Task>, path: &String) -> usize {
    let mut board = board::Board::load(path.clone());
    let task_count = tasks.len();
    board.tasks.append(&mut tasks);
    board.save(path.clone());
    task_count
  }
}