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
  board   Show your board from your current directory
  serve   Create a server that serve your board
  remove  Remove a TODO comment inside your file
  move    Change the state of your task
  help    Print this message or the help of the given subcommand(s)

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

### Arguments

| Argument    | Value               | Required    |
| ----------- | ------------------- | ----------- |
| export      | your json file name | No          |
| path        | a file path to scan | No          |

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
      "id": "",
      "title": "TXkgdGFzaw==.KDMzLDM3KQ==",
      "description": "A long multi line\ndescription",
      "state": "TODO",
      "tags": [],
      "info": {
        "filename": "docs\\basic\\syntax\\index.md",
        "start_line": 33,
        "end_line": 37,
        "date": "2024-11-18 09:29:04 UTC",
        "author": {
          "name": "John Doe",
          "email": "john.doe@test.com"
        }
      },
      "raw": "LyoNCiAgW1RPRE9dOiBNeSB0YXNrDQogIEEgbG9uZyBtdWx0aSBsaW5lDQogIGRlc2NyaXB0aW9uDQoqLw0K"
    },
    {
      "title": "TXkgdGFzaw==.KDQ4LDUyKQ==",
      "description": "A task that contains\n#ui and #frontend tag",
      "state": "TODO",
      "tags": [
        "ui",
        "frontend"
      ],
      "info": {
        "filename": "docs\\basic\\syntax\\index.md",
        "start_line": 48,
        "end_line": 52,
        "date": "2024-11-18 09:29:04 UTC",
        "author": {
          "name": "John Doe",
          "email": "john.doe@test.com"
        }
      },
      "raw": "LyoNCiAgW1RPRE9dOiBNeSB0YXNrDQogIEEgdGFzayB0aGF0IGNvbnRhaW5zDQogICN1aSBhbmQgI2Zyb250ZW5kIHRhZw0KKi8NCg=="
    }
  ]
}
```

## Remove a comment
You can remove a comment by calling the **remove** command.

### Arguments

| Argument    | Value                                             | Required    |
| ----------- | ------------------------------------------------- | ----------- |
| file        | your file path                                    | Yes         |
| id          | Id is a short identifier of your comment          | Yes         |

```bash
taskify remove --file docs\\basic\\syntax\\index.md \
--id TXkgdGFzaw==.KDQ4LDUyKQ== \
```

## Change a task state
You can change a task state by calling the **move** command.

### Arguments

| Argument    | Value                                                            | Required    |
| ----------- | ---------------------------------------------------------------- | ----------- |
| file        | your file path                                                   | Yes         |
| id          | Id is a short identifier of your comment                         | Yes         |
| from        | your current state, possible value (TODO|WIP|READY|TESTING|DONE) | Yes         |
| to          | your target state, possible value (TODO|WIP|READY|TESTING|DONE)  | Yes         |

```bash
taskify move --file docs\\basic\\syntax\\index.md \
--id TXkgdGFzaw==.KDQ4LDUyKQ== \
--from TODO --to READY
```
