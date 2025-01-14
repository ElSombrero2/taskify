use std::{path::Path, sync::mpsc};
use git2::Repository;
use notify::{Config, Error, Event, RecursiveMode, Watcher};
use crate::{syntax::Syntax, task::Task};

/// This code gives me a headache because there is no
/// way to skip some files while traversing file tree but 
/// but who cares?!
pub fn on_file_change<F>(root: String, syntax: impl Syntax<Task>, callback: F) where F: Fn(Vec<Task>, &str) -> bool {
  let config = Config::default().with_compare_contents(true);
  let repos = Repository::open(&root);
  let (tx, rx) = mpsc::channel::<Result<Event, Error>>();

  if let Ok(mut watcher) = notify::recommended_watcher(tx) {
    watcher.configure(config).unwrap();
    
    if watcher.watch(Path::new(&root), RecursiveMode::Recursive).is_ok() {
      'main: for event in rx.iter().flatten() {
        if !(event.kind.is_access() || event.kind.is_other()) {
          for path in event.paths {
            let tasks = Task::match_regex(
              path.to_str().unwrap().to_string(),
              &repos,
              &syntax
            );
            if !tasks.is_empty() && callback(tasks, &root) {
              break 'main;
            }
          }
        }
      }
    }
  
  }
}