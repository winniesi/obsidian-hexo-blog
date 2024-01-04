---
title: Home brew 查看包被哪些软件依赖
---
```bash
# 查看软件有哪些依赖包：
brew deps --installed zbar

# 查看包被哪些软件依赖
brew uses --installed ufraw
```