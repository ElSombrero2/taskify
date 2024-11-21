---
prev: false
next:
  text: 'Windows'
  link: '/install/windows'
---

# Linux installation

You can download the Taskify release [here](https://github.com/ElSombrero2/taskify/releases/) or use this following command:
```bash
sudo curl -L -o taskify.tar.gz https://github.com/ElSombrero2/taskify/releases/download/release-v0.1.0/taskify-linux.tar.gz
```

Then extract your binary

```bash
sudo tar -xf taskify.tar.gz
```

Move it into your root dir

```bash
sudo mv .build/dist/linux/taskify /bin/taskify
```

Make the binary executable

```bash
sudo chmod 755 /bin/taskify
```

Now you can try your taskify help command

```bash
taskify --help
```
