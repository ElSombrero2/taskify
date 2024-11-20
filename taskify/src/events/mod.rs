use std::{path::Path, sync::mpsc};
use git2::Repository;
use notify::{Config, Error, Event, RecursiveMode, Watcher};
use crate::task::Task;

pub fn on_file_change<F>(root_directory: String, callback: F) where F: Fn(Vec<Task>, &str) {
  let config = Config::default()
  .with_manual_polling();
  let repos = Repository::open(".");
  let (tx, rx) = mpsc::channel::<Result<Event, Error>>();

  if let Ok(mut watcher) = notify::recommended_watcher(tx) {
    watcher.configure(config).unwrap();
    if watcher.watch(Path::new(&root_directory), RecursiveMode::Recursive).is_ok() {
      for event in rx.iter().flatten() {
        for path in event.paths {
          let tasks = Task::match_regex(path.to_str().unwrap().to_string(), false, &repos);
          if !tasks.is_empty() {
            callback(tasks, &root_directory);
          }
        }
      }
    }
  }
}