---
title: macOS 按需要挂载硬盘
date: 2024-01-04 19:31
updated: 
tags:
  - macOS
categories: 
permalink: 
published: true
cover: 
description: 
author: winniesi
---

由于我工作用的 MacBook 常年连接显示器使用（LG Ultrafine 4K），又通过显示器的 type-c 连接移动硬盘使用。电脑每次开机都会自动 mount 硬盘，这没问题，但每次断开 MacBook 和显示器的连接时，都需要 unmount 一下这个硬盘，就特别烦人。

这块硬盘的资料只是偶尔查看，我需要系统不再自动加载这块硬盘，需要的时候我手动加载，github 上有一个项目能满足我的要求，但是已经太久不更新了我估计跑不起来。

在 Linux 里面可以用 fstab 文件控制加载，我觉得在 macOS 同样可以吧！试了试，确实可以！

只需要在 macOS /etc/fstab 文件里面添加这样一行：

```jsx
UUID=xxx-xxx none exfat rw,noauto
```

上面的 UUID 和硬盘格式可以通过 diskutil info /Volumes/硬盘名 获得（请看下面图片）。

![Untitled](https://qiniuimages.baidiudiu.com/uPic/P8RyWN.png)

这样再次连接移动硬盘就不会自动加载了，在「磁盘工具.app」手动加载才能使用。