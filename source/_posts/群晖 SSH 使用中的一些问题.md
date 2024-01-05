---
title: 群晖 SSH 使用中的一些问题
date: 2024-01-04 19:37
updated: 
tags:
  - Blogging
categories: 
permalink: 
published: true
cover: 
description: SCP 问题的奇怪问题和 .ssh 文件夹权限问题
author: winniesi
---

最近在开发过程中使用群晖遇到一些问题。

# SCP 问题

在 macOS 使用 scp 命令传输文件时用了一条这样的命令：

```bash
scp -P 223 -r ./file-path/* username@domain.com:/volume1/destination/
```

结果报错：

```bash
subsystem request failed on channel 0
scp: Connection closed
```

在网上搜索了一顿发现添加一个参数 `-O` 就可以了，果然可以。但是当我在 Linux 里面部署时就需要去掉这个参数才能正常使用。不知道为什么🤷 没有再研究。

# .ssh 文件夹权限问题

这个问题之前出现过，已经忘了怎么解决的了但是这次又出现了。症状是通过 SSH 远程连接群晖主机，已经在群晖 `~/.ssh/authorized_keys` 文件夹设置好了 key 但是连接依然需要使用密码。

这次查找问题就方便多了，chatGPT 告诉我：

> **权限设置问题**: 确保你的 .ssh 目录和 authorized_keys 文件的权限是正确的。通常 .ssh 目录的权限应为 700 (drwx------)，authorized_keys 文件的权限应为 600 (-rw-------)。

解决的方法比较简单：

```bash
chmod 700 .ssh
chmod 600 .ssh/authorized_keys
```

果然问题就解决了🙇