---
title: 通过 GitHub action 同步 obsidian 文章到 Hexo（deployed on Vercel）
date: 2024-01-04 18:11:24
updated: 2024-01-05 10:34:49
tags:
  - Obsidian
  - Hexo
  - GitHub
categories: 
permalink: 
published: true
cover: 
description: 目标是将托管在 GitHub 上面 obsidian blog 目录下面的内容自动同步到 GitHub Hexo，然后就可以通过 vercel 等服务自动部署
author: winniesi
---


目标是将托管在 GitHub 上面 obsidian blog 目录下面的内容自动同步到 GitHub Hexo，然后就可以通过 vercel 等服务自动部署。（教程不包括自动部署的部分）

### 准备

1. 两个 GitHub repo，分别是备份 obsidian 的 obsidian.git 和 Hexo 项目的obsidian-hexo-blog.git。
2. GitHub 访问令牌，需要在你的 obsidian.git 的 action 中通过令牌来更新 hexo 项目，令牌的具体位置在这里 https://github.com/settings/tokens ，点击左侧 Personal access tokens - Tokens (classic) 选取权限后生成令牌，建议把过期时间设置为 `no expiration`。![token](https://qiniuimages.baidiudiu.com/uPic/kBdXXv.png)

### 开始

在 obsidian git 的项目文档的 `.github/workflows/push-to-hexo.yml` 文件中创建 GitHub action：

注意把代码中的 `obsidian-hexo-blog.git` 替换为你 hexo repo 实际的名字，把 `<token>` 替换为上面获得的令牌。

```yml
name: Sync Markdown to Another Repo

on:
  push:
    paths:
      - "blog/**"

jobs:
  sync_markdown_files:
    runs-on: ubuntu-latest
    steps:
      - name: Check out source repository
        uses: actions/checkout@v3

      - name: Push changes to the target repository
        run: |
          # 设置用户信息
          git config --global user.email "email"
          git config --global user.name "username"

          # 克隆目标仓库
          git clone https://<token>/winniesi/obsidian-hexo-blog.git

          # 创建一个临时目录并复制博客目录中的更改
          mkdir temp_sync
          cp -r blog/*.md temp_sync/

          # 移动到目标仓库directory
          cd obsidian-hexo-blog

          # 检出 main 分支
          git checkout main

          # 删除 hexo 已有的 Markdown 文件
          rm -rf source/_posts/*.md
          # 复制 Markdown 文件到 hexo 目录
          cp -r ../temp_sync/*.md source/_posts/
          rm -rf ../temp_sync

          git add .
          git commit -m "Sync Markdown files from source repository"

          # 使用 Access Token 推送更改
          git push https://<token>@github.com/winniesi/obsidian-hexo-blog.git main
```

### 工作原理

当 obsidian git 下面的 `blog` 目录有更新后会触发该 action。其工作流程我在代码中写了备注。

现在将需要发布的文章放到 blog 文件夹并同步到 git，然后 action 会自动把 blog 目录下面的文章推送到 hexo github repo，触发 vercel 等服务就回自动发布到 hexo 线上博客了。