use taskify::{board, events, task::Task};

fn on_task () -> Box<dyn Fn(Vec<Task>) -> ()> {
  println!("File watching is enabled");
  return Box::new(move |mut tasks: Vec<Task>| {
    let dir = ".examples/node-app".to_string();
    let mut board = board::Board::load(dir.clone());
    let task_count = tasks.len();
    board.tasks.append(&mut tasks);
    board.save(dir);
    println!("Board updated: {} tasks added", task_count);
  });
}

fn main() {
  let dir = ".examples/node-app".to_string();
  let mut tasks = Task::scan(dir.clone());
  let mut board = board::Board::load(dir.clone());
  board.tasks.append(&mut tasks);
  board.save(dir);
  events::on_file_change(".examples/node-app".to_string(), on_task());
}