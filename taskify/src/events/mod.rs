use std::{path::Path, sync::{mpsc::{self, Sender}, Arc}, thread, time::Duration};
use git2::Repository;
use notify::{Config, Error, Event, RecursiveMode, Watcher};
use crate::{syntax::Syntax, task::Task};

/// This code gives me a headache because there is no
/// way to skip some files while traversing file tree but 
/// but who cares?!
pub fn on_file_change<T, I, C, D>(root: String, syntax: impl Syntax<Task>, init: I, callback: C, dispose: D) 
where I: Fn(Sender<Result<Event, Error>>) -> T,
C: Fn(Vec<Task>, &str),
D: Fn(T),
{
  // TODO Remove all the println after debugging
  let config = Config::default().with_compare_contents(true);
  let repos = Repository::open(&root);
  let (tx, rx) = mpsc::channel::<Result<Event, Error>>();
  config.with_poll_interval(Duration::from_millis(2000));
  println!("Start listening to: {}", root);
  let result = init(tx.clone());
  if let Ok(mut watcher) = notify::recommended_watcher(tx) {
    watcher.configure(config).unwrap();
    
    if watcher.watch(Path::new(&root), RecursiveMode::Recursive).is_ok() {
      'main: for event in rx.iter().flatten() {
        if !(event.kind.is_access() || event.kind.is_other()) {
          if let Some(info) = &event.info() {
            if info.eq(&"END") {
              println!("Stop listening to: {}", root);
              break 'main;
            }
          }
          for path in event.paths {
            let tasks = Task::from_path(
              path.to_str().unwrap().to_string(),
              &repos,
              &syntax
            );
            callback(tasks, &root);
          }
        }
      }
    }
  }

  dispose(result);
}