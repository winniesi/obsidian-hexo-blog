---
title: 使用 direnv 自动激活 python 虚拟环境
date: 2024-01-04 19:34
updated: 
tags:
  - Blogging
categories: 
permalink: 
published: true
cover: 
description: 
author: winniesi
---

从 python 3 的某个版本后，创建虚拟环境变得很方便：

```bash
python3 -m venv env_xxx
```

但是这个方式有个问题，那就是每次更换开发的项目的时候，需要频繁的切换虚拟环境。

direnv 这个项目可以很好的解决这个问题，和 pyenv 类似，direnv 会在项目目录下写入一个文件 `.envrc` 并写入进入文件后需要运行的命令。

值得一提的是 direnv 对 python 虚拟环境支持的非常好，只需要简单的设置就能使用。

在需要激活的文件夹下创建 `.envrc` 文件并写入：

```bash
layout python3
```

在该目录下执行 `direnv allow .` 授予权限，这时候会在当前目录的 `.direnv` 文件夹下自动创建虚拟环境（不需要再手动创建了）。下次进入这个文件即可自动激活该虚拟环境。

关于 direnv 对 python 的支持，更多内容和兼容性可以看这里：

[Python · direnv/direnv Wiki](https://github.com/direnv/direnv/wiki/Python)

另外，vscode 上也有支持 direnv 的扩展，用起来很方便。