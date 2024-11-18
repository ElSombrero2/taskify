---
next:
  text: 'Ignore files'
  link: '/basic/ignore'
---

# Basic

Taskify is a simple tool that help you to create a board from your TODO.
comments

## Basic Syntax

Taskify have a simple declarative syntax inside your comment.  
For creating a new TODO inside your board just create a multi lines
and your comment must follow these syntax.

```js
/*
  [TODO]: <title>
  <description>
*/
function myFunction () {

}
```
Explanation: The **[TODO]** in the first line is the state of your task, followed by the title 
that is separated by a **": "**.  
The second line represent the description of your task and it can be a multi lines string.  
Example:

```js
/*
  [TODO]: My task
  A long multi line
  description
*/
function mySecondFunction () {

}
```
## Tags

Tags are the tags that can filter your Task, they can be declared by using #.  
And you can add tags inside the description of your task.  

```js
/*
  [TODO]: My task
  A task that contains
  #ui and #frontend tag
*/
function myThirdFunction () {

}

```

::: info
Note that you can create your TODO anywhere inside your code.
```js
function myFunction () {
  /*
    [TODO]: it's a TODO
    A TODO inside a function
  */
}
```
And your TODO can be created without description.
```js
function myFunction () {
  /* [TODO]: A simple TODO without description */
}
```
:::

## States
You can create a simple TODO with another state.  
For now you can only use these states:
  - TODO
  - READY
  - WIP
  - TESTING
  - DONE

```ts
/*
  [READY]: Create an add function
  Create a function that add two
  number a and b
*/
function add (a: number, b: number) {
  return 0;
}

/*
  [TESTING]: Create an pow function
  Create a function that returns a power b
*/
function pow (a: number, b: number) {
  return a ** b;
}

/* [WIP]: Export your module */
export { }
```