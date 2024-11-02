
fn main() {
    for comment in taskify::comments::get_all_comments(String::from(".examples/node-app/main.ts")) {
        println!("=========================================");
      println!("{}", comment.title.unwrap());
      if let Some(desc) = comment.description {
        println!("\n{}", desc);
      }
      println!("=========================================\n");
    }

}
