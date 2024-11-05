use std::{path::Path, sync::mpsc};
use notify::{Config, Error, Event, RecursiveMode, Watcher};
use crate::task::Task;

pub fn on_file_change<F>(directory: String, callback: F) where F: Fn(Vec<Task>) -> () {
  let config = Config::default()
  .with_manual_polling();

  let (tx, rx) = mpsc::channel::<Result<Event, Error>>();

  if let Ok(mut watcher) = notify::recommended_watcher(tx) {
    watcher.configure(config).unwrap();
    watcher.watch(Path::new(&directory), RecursiveMode::NonRecursive).unwrap();
    for res in rx {
      match res {
        Ok(event) => {
          for path in event.paths {
            let tasks = Task::find_all(path.to_str().unwrap().to_string(), true);
            if tasks.len() > 0 {
              callback(tasks);
            }
          }
        },
        _ => {},
      }
    }
  }
}