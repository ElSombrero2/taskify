# What is Taskify?

Taskify is a TODO to KANBAN tool that allow you to create a KANBAN Board from your TODO comment by
using a specific TODO syntax

#### Language Support

Now this tool only support **C based** language like **C++**, **Rust**, **Java**, **C#**, **Javascript**, **Typescript** and **Kotlin**.
But you can add other regex that support you own language as you need.

#### Why should I use Taskify?

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

First, add **.taskify** inside your **.gitignore** file.
Taskify must be only in your local project for preventing 
git conflict.

## CLI
Just call the scan command to scan your directory

```bash
taskify scan ./
# Or you can watch the changes of your directory
# by using --watch
taskify scan ./ --watch
```
You can run **taskify --help** to see whats are all commands you can use
```bash
 _____                 _      _    __               _
|_   _|   __ _   ___  | | __ (_)  / _|  _   _      (_)   ___
  | |    / _` | / __| | |/ / | | | |_  | | | |     | |  / _ \
  | |   | (_| | \__ \ |   <  | | |  _| | |_| |  _  | | | (_) |
  |_|    \__,_| |___/ |_|\_\ |_| |_|    \__, | (_) |_|  \___/
                                        |___/
                                        
Welcome to Taskify CLI.
Visit https://github.com/ElSombrero2/taskify

Usage: cli.exe <COMMAND>

Commands:
  scan  Command that scan directory, use
        taskify scan --help
        command for more information
  help  Print this message or the help of the given subcommand(s)

Options:
  -h, --help Print help (see a summary with '-h')

  -V, --version Print version
```
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
  - [x] Create a command that scan your directory
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