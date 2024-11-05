use taskify::board::Board;

fn main() {
    let board = Board::load(".examples/node-app".to_string());
    println!("Project Name: {}", board.name);
    
    if board.tasks.len() <= 0 {
        println!("<Board Empty>");
    } else {
        for task in board.tasks {
            println!("-------------------------------");
            println!("[{}] {}", task.state, task.title);
            if let Some(description) = task.description {
                println!("{}", description); 
            }
            println!();
            print!("tags: ");
            for tag in task.tags {
                print!("{} ", tag);
            }
            println!();
            println!("-------------------------------");
        }
    }
}
