# What is Taskify?

Taskify is a TODO to KANBAN tool that allow you to create a KANBAN Board from your TODO comment by
using a specific TODO syntax

# Language Support

Now this tool only support C based language like C++, Rust, Java, C#, Javascript, Typescript and Kotlin.
But you can add other regex that support you own language as you need.

# Why should I use Taskify?

# VS Code Integration

# Usage

# TODO

- [ ] Core Application
  - [ ] Create regex and language support as Plugin.
  - [ ] Read all files
  - [x] Find comments by regex
  - [x] Parse the file by interpreting the comment
  - [ ] Create a config file inside .taskify directory
  - [ ] Add all task inside
  - [x] Remove the TODO from the file after scanning
- [ ] CLI App
  - [ ] Create a command that scan your directory
  - [ ] Show the board
  - [ ] Create command that moves task inside the board
  - [ ] Create a command that remove or update task
  - [ ] Create a command that search a task from the board
  - [ ] Create a sorting and filtering task method
- [ ] Desktop App
  - [ ] Create a graphic interface that show your board with all TODOs
  - [ ] Allow users to search a specific task
  - [ ] The user can manage his board directly with the Desktop App
  - [ ] Real time change detection from CLI App, Commend edit and Desktop App
- [ ] Create a web interface that do the same things that the Desktop App but inside a web browser
- [ ] Create a VS Code plugin that do the same things that desktop and web interface but inside VS Code