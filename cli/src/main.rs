use notify::Error;
use taskify::{events, task::task::Task};

fn on_task (task: Result<Task, Error>) {
  if let Ok(task) = task {
    println!("----------------------------------");
    println!("[{}] {}", task.state, task.title);
    if let Some(description) = task.description {
      println!("\n{} ", description);
    }
    print!("\nTags: ");
    for tag in task.tags {
      print!("{} ", tag);
    }
    println!("\n----------------------------------");
  }
}

fn main() {
  events::on_file_change(String::from(".examples/node-app"), on_task);  
}