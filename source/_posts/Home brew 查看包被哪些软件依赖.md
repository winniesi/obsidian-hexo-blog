---
title: Home brew 查看包被哪些软件依赖
date: 2024-01-04 19:36:27
updated: 2024-01-05 10:34:09
tags:
  - Blogging
categories: 
permalink: 
published: true
cover: 
description: 
author: winniesi
---

```bash
# 查看软件有哪些依赖包：
brew deps --installed zbar

# 查看包被哪些软件依赖
brew uses --installed ufraw
```