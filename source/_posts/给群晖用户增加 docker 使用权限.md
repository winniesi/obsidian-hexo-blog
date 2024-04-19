---
title: 给群晖用户增加 docker 使用权限
date: 2024-04-19 13:23:47
updated: 
tags:
  - Blogging
  - Synology
categories: 
permalink: 
published: true
cover: 
description: 群晖 DSM 7.x 默认没有 docker 组，添加后方便使用第三方管理 docker。
author: winniesi
---
群晖 DSM 7.x 默认没有 docker 组。

```bash
 sudo synogroup --add docker # 创建 Docker 组（如果还未存在）
 sudo synogroup --member docker [username] # 将用户添加到 Docker 组

```

Docker 守护进程 socket (/var/run/docker.sock) 的权限设置不允许当前用户访问。需要调整守护进程socket文件的权限来解决。

```bash
sudo chown root:docker /var/run/docker.sock # 更改文件群组所有权，将 Docker socket 的群组所有权更改为 docker 组
sudo chmod 660 /var/run/docker.sock # 修改群组权限确保 docker 组的成员可以通过 socket 连接 Docker
```

到这里应该就可以了。