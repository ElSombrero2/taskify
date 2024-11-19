---
prev:
  text: 'Syntax'
  link: '/basic/syntax'
next:
  text: 'CLI'
  link: '/basic/cli'
---

# Ignore
Sometimes you need to ignore some directories to have 
better performance while reading files.  
So for example you have this following directory tree: 
```text
node_modules/
  ...
src/
  main.ts
dist/
.gitignore
package.json
package-lock.json
tsconfig.json
```
and you need to ignore the node_modules and dist directory
so you can directly create a **.taskifyignore** file in root root
directory, so Taskify will automatically ignore all the files name pattern
inside your .taskifyignore file

```text
# Inside the .taskifyignore file
node_modules
.gitignore
dist
.git
```
::: warning
Not ignoring some directories like **.git**, **target** or **node_modules** 
can greatly affect the performance and display speed of your board
:::