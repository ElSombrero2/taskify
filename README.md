# What is Taskify?

Taskify is a TODO to KANBAN tool that allow you to create a KANBAN Board from your TODO comment by
using a specific TODO syntax

# Language Support

Now this tool only support **C based** language like **C++**, **Rust**, **Java**, **C#**, **Javascript**, **Typescript** and **Kotlin**.
But you can add other regex that support you own language as you need.

# Why should I use Taskify?

**Taskify** will load all your **TODO** comments and add it into a **KANBAN board**.
It allow you to have a personal Board that will contains all the tasks that you have
to do inside your code.
## Syntax

You can directly create a multiline comment that follows this current syntax

```javascript
/*
  [TODO]: <title>
  <description: can be multilines>
*/
function myFunction() {
  // ignored comment
  // [TODO]: Ignored TODO
  /*
    [READY]: Not ignored TODO
    With description and #tags
  */
}
```
For now all the states authorized are: **TODO**, **READY**, **TESTING** and **DONE**

```rust
/*
  [TESTING]: Create Unit test for the function Something
  Add some long description
  with tags like #math and #calculus
*/
fn add(a: u16, b: u16) -> u16 {
  return a + b;
}

/*
  [READY]: Write the implementation of the multiply function
  This function must returns a x b
*/
fn multiply(a: u16, b: u16) -> u16 {
  return 0;
}
```

# Usage

First, don't forget to add **.taskify** directory inside your **.gitignore** file.

## CLI
Work in progress.
## Web Integration

## Desktop App

## VS Code Integration

# TODO

- [x] Core Application
  - [x] Read all files
  - [x] Find comments by regex
  - [x] Parse the file by interpreting the comment
  - [x] Create a config file inside .taskify directory
  - [x] Add all task inside
  - [x] Remove the TODO from the file after scanning
  - [x] Add file watching feature
  - [x] Add ignoring dir or file feature
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