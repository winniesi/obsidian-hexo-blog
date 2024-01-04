---
title: 不删除本地文件的情况下删除 GitHub 上多余的文件
---
以删除 .direnv 文件夹为例：

```bash
git rm -r --cached .direnv  # --cached 不会把本地的 .direnv 删除
git commit -m 'delete .idea dir'
git push -u origin master`
```