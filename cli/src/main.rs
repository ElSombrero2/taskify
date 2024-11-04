use std::{path::Path, sync::mpsc};

use notify::{Config, Event, RecursiveMode, Watcher};

fn main() {
  let config = Config::default()
  .with_manual_polling();

  let (tx, rx) = mpsc::channel::<Result<Event, notify::Error>>();
  let mut watcher = notify::recommended_watcher(tx).unwrap();
  watcher.configure(config).unwrap();

  watcher.watch(Path::new(".examples/node-app"), RecursiveMode::NonRecursive).unwrap();
  
  for res in rx {
    match res {
      Ok(event) => {
        for path in event.paths {
          for task in taskify::task::find_all(path.to_str().unwrap().to_string(), true) {
            println!("----------------------------------");
            println!("[{}] {}", task.state, task.title);
            if let Some(description) = task.description {
              println!("\n{}", description);
            }
            println!("----------------------------------");
          } 
        }
      },
      Err(e) => println!("watch error: {:?}", e),
    }
  }
}