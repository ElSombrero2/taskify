---
prev:
  text: 'CLI'
  link: '/basic/cli'
next: false
---

# Serve command

Taskify embed a REST API Server that simplify your
frontend client integration if you need to use a local
client for your KANBAN Board.

To start the API Server, just use the **serve** comman.

### Arguments
| Argument    | Value                                 | Required    |
| ----------- | ------------------------------------- | ----------- |
| port        | Your listening port (8000 by default) | No          |

```bash
taskify serve
```

You can change your listening port by passing the argument **port**

```bash
taskify serve --port 3000
```
# Documentation

You can find the API REST Documentation directly on **http://127.0.0.1:\<port\>**.