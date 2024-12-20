use taskify::task::Task;

pub fn format_task (task: &Task) -> String {
  let mut str_builder = String::new();
  
  str_builder.push_str(&format!("[id: {}]\n\n{}", &task.id, &task.title));
  
  if let Some(desc) = &task.description { str_builder.push_str(&format!("\n\n{}", desc)); }
  
  if let Some(author) = &task.info.author {
    if let Some(name) = &author.name { str_builder.push_str(&format!("\n\nAuthor: {name} ")); }
    if let Some(email) = &author.email { str_builder.push_str(&format!("<{email}>")); }
  }

  if let Some(date) = &task.info.date { str_builder.push_str(&format!("\nFrom: {date}")); }

  str_builder.push_str(&format!(
    "\n\n{} (line: {}:{})",
    task.info.filename,
    task.info.start_line,
    task.info.end_line
  ));

  str_builder
}