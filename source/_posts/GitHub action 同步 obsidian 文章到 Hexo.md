---
title: 利用 GitHub action 同步 obsidian 文章到 hexo
---

目标是将托管在 GitHub 上面 obsidian blog 目录下面的内容自动同步到 Hexo。


在 obsidian git 项目创建 action：

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
