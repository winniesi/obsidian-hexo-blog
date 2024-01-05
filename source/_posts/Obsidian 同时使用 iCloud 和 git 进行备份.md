---
title: Obsidian 同时使用 iCloud 和 git 进行备份
date: 2024-01-04 14:07:33
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

使用 iCloud 备份 Obsidian 可以很方便的在 iPhone 和  macOS 之间同步，但是我同时想通过 git 来同步，这样有更多的可操作性（比如通过 github 上的备份生成博客等）。

Obsidian 支持通过 Obsidian git 插件来同步，但是带来的问题是 obsidian vault 里面的 `.git` 目录会存在太多的版本数据，这个给 iCloud 同步带来了很多负担，而且可能产生一些文件冲突问题。

不过 git 支持单独设置 `.git` 文件夹，这样就解决了问题：

```shell
git init --separate-git-dir=~/Data/Obsidian-git
```

经测试，obsidian git 插件没有产生任何异常。

## git 设置

除了对 .git 文件的处理以外，为了不滥用 GitHub，我在 .gitignore 上取消了 .obsidian（设置和插件目录）、.trash（回收站）和附件目录的同步。

## Obsidian git 插件设置
设置自动备份时间为，我觉得没有必要太频繁的向 GitHub 提交，其实设置成30分钟比较合理。设置后会自动执行 commit & push 来提交。

![obsidian git 设置](https://qiniuimages.baidiudiu.com/uPic/5WXYf0.png)

也可以为手动备份设置一个快捷键，方便自己快速的提交备份。

![](https://qiniuimages.baidiudiu.com/uPic/1rUJYQ.png)