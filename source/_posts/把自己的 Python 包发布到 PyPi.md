---
title: 把自己的 Python 包发布到 PyPi
date: 2024-01-04 19:33
updated: 
tags:
  - Blogging
categories: 
permalink: 
published: true
cover: 
description: 把自己的写的 python 包发布到 pypi 后，就可以方便的通过 pip install 安装。写过大名鼎鼎 requests 包的作者有一个 setup.py 文件，用这个已经配置好的文件可以非常方便的上传自己的包。
author: winniesi
---

把自己的写的 python 包发布到 pypi 后，就可以方便的通过 pip install 安装。写过大名鼎鼎 requests 包的作者有一个 [setup.py](http://setup.py/) 文件，用这个已经配置好的文件可以非常方便的上传自己的包。

先下载该作者的 setup 文件到自己的项目目录：[https://github.com/kennethreitz/setup.py](https://github.com/kennethreitz/setup.py)

再在本机生成安装文件：

```bash
# 把文件打包成 .tar.gz
python setup.py sdist build

# 安装 wheel
pip install wheel

# 打包成 wheels 格式包
python setup.py bdist_wheel --universal
```

在 pypi 注册账号，记得要验证邮箱才能上传包。通过 pip 安装 twine 后，使用 twine 上传自己的 pip 包：

```bash
twine upload dist/*
```