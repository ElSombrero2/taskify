---
prev:
  text: 'Ignore files'
  link: '/basic/ignore'
next:
  text: 'Server'
  link: '/basic/server'
---

# CLI Tool

You can use the taskify CLI tool [here](https://github.com/ElSombrero2/taskify)

## Syntax
Use the help command to get all available commands
```bash
taskify --help
```

Result
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
  board  Show your board from your current directory
  serve  Create a server that serve your board (Work in Progress)
  help   Print this message or the help of the given subcommand(s)

Options:
  -h, --help
          Print help (see a summary with '-h')

  -V, --version
          Print version
```

## Showing board

You can show your board by calling the board command

```bash
taskify board
```

## Export
Taskify allow you to export your board to json by 
calling the board export command

Just give your export action and specify your file name to export your board
```bash
taskify board --export my-board.json
```

Here is a result example for this command
```json
// my-board.json
{
  "name": "taskify",
  "tasks": [
    {
      "title": "Create a TODO export for this file",
      "description": "Create a TODO json export\nthat contains the details of this task",
      "state": "TODO",
      "tags": [],
      "info": {
        "filename": "taskify\\src\\board\\mod.rs",
        "start_line": 13,
        "end_line": 17,
        "date": "2024-11-05 15:16:39 UTC",
        "author": {
          "name": "John Doe",
          "email": "john.doe@example.com"
        }
      }
    },
    {
      "title": "Create a testing file",
      "description": "Test your exportation here",
      "state": "TESTING",
      "tags": [],
      "info": {
        "filename": "taskify\\src\\board\\mod.rs",
        "start_line": 28,
        "end_line": 32,
        "date": "2024-11-07 13:40:10 UTC",
        "author": {
          "name": "John Doe",
          "email": "john.doe@example.com"
        }
      }
    }
  ]
}
```