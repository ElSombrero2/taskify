use std::{path::Path, sync::mpsc};
use notify::{Config, Error, Event, RecursiveMode, Watcher};
use crate::task::{self, task::Task};

pub fn on_file_change<F>(directory: String, callback: F) where F: Fn(Result<Task, Error>) -> () {
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
            for task in task::find_all(path.to_str().unwrap().to_string(), true) {
              callback(Ok(task));
            } 
          }
        },
        Err(e) => { callback(Err(e)); },
      }
    }
  }
}