---
prev:
  text: 'Linux'
  link: '/install/linux'
next:
  text: 'Basic'
  link: '/basic/syntax'
---
# Windows installation

Download Taskify [here](https://github.com/ElSombrero2/taskify/releases/) and extract your taskify.exe 
into a directory,  
for example **C:/bin/taskify**

## Add to path variable

Open your terminal and use that command

```cmd
setx PATH "<your binary file directory>;%PATH%"
```

For example

```cmd
setx PATH "C:\bin\taskify;%PATH%"
```

Now you need to restart your terminal and try your help command

```cmd
taskify --help
```