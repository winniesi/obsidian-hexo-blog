---
title: 群晖 DSM7 安装 transmission
date: 2024-01-04 19:30
updated: 
tags:
  - 群晖
categories: 
permalink: 
published: true
cover: 
description: 很多年前买了一台群晖 DS218，然后买了2块二手 2tb 硬盘塞了进去，没想到这两块兢兢业业的工作了很多年
author: winniesi
---

# 硬盘坏了

很多年前买了一台群晖 DS218，然后买了2块二手 2tb 硬盘塞了进去，没想到这两块兢兢业业的工作了很多年。

只是就在前几天，群晖报警有一块硬盘坏了。我这才关注了一下硬盘的使用时间，死掉的这个硬盘工作了3万多小时，还活着的这块硬盘使用时间已经超过5万小时……我感觉这块也要挂了。


其实我对硬盘的需求很小，这台群晖最大的用处是在 docker 上跑 shadowsocks server 和 homebridge，跑一些临时用的静态网页和脚本。再有就是用 transmission 下载一些不会一直保留的🎬电影。

# 安装 transmission

我参考这篇文章完成了安装，对我来说完全没有问题：

[为群晖DSM 7安装Transmission及其加强版中文界面](https://ceshidao.com/get-enhanced-transmission-running-on-dsm7/)

### 安装步骤：

- DSM7 套件中心添加安装源：[http://packages.synocommunity.com/](http://packages.synocommunity.com/)
- 更改下载文件夹的属性，添加 everyone 完全控制（我不确定这一步是否有其他风险）
- 修改 DSM7 系统 hosts 文件来访问 github（没想到真的有用耶）
- 安装 transmission 皮肤，要用 root 用户运行一键安装脚本，大概看了下没什么问题：[https://github.com/ronggang/transmission-web-control](https://github.com/ronggang/transmission-web-control)

# 配置文件

我需要对 transmission 进行一些个性化配置，我的配置文件在 /volume1/@appdata/transmission/

```jsx
{
    "alt-speed-down": 50,
    "alt-speed-enabled": false,
    "alt-speed-time-begin": 540,
    "alt-speed-time-day": 127,
    "alt-speed-time-enabled": false,
    "alt-speed-time-end": 1020,
    "alt-speed-up": 50,
    "bind-address-ipv4": "0.0.0.0",
    "bind-address-ipv6": "::",
    "blocklist-enabled": false,
    "blocklist-url": "<http://www.example.com/blocklist>",
    "cache-size-mb": 4,
    "dht-enabled": true,
    "download-dir": "/volume2/b_downloads/transmission_complete",
    "download-queue-enabled": true,
    "download-queue-size": 5,
    "encryption": 1,
    "idle-seeding-limit": 30,
    "idle-seeding-limit-enabled": false,
    "incomplete-dir": "/volume1/ssd_download/transmission_download/incomplete",
    "incomplete-dir-enabled": true,
    "lpd-enabled": false,
    "message-level": 2,
    "peer-congestion-algorithm": "",
    "peer-id-ttl-hours": 6,
    "peer-limit-global": 200,
    "peer-limit-per-torrent": 50,
    "peer-port": 51413,
    "peer-port-random-high": 65535,
    "peer-port-random-low": 49152,
    "peer-port-random-on-start": false,
    "peer-socket-tos": "default",
    "pex-enabled": true,
    "pidfile": "/volume1/@appdata/transmission/transmission.pid",
    "port-forwarding-enabled": true,
    "preallocation": 1,
    "prefetch-enabled": true,
    "queue-stalled-enabled": true,
    "queue-stalled-minutes": 30,
    "ratio-limit": 2,
    "ratio-limit-enabled": false,
    "rename-partial-files": true,
    "rpc-authentication-required": true,
    "rpc-bind-address": "0.0.0.0",
    "rpc-enabled": true,
    "rpc-host-whitelist": "",
    "rpc-host-whitelist-enabled": true,
    "rpc-password": "your-password-here",
    "rpc-port": 9091,
    "rpc-url": "/transmission/",
    "rpc-username": "winniesi",
    "rpc-whitelist": "127.0.0.1,::1",
    "rpc-whitelist-enabled": false,
    "scrape-paused-torrents-enabled": true,
    "script-torrent-done-enabled": false,
    "script-torrent-done-filename": "",
    "seed-queue-enabled": false,
    "seed-queue-size": 10,
    "speed-limit-down": 100,
    "speed-limit-down-enabled": false,
    "speed-limit-up": 100,
    "speed-limit-up-enabled": false,
    "start-added-torrents": true,
    "trash-original-torrent-files": false,
    "umask": 2,
    "upload-slots-per-torrent": 14,
    "utp-enabled": true,
    "watch-dir": "/volume1/ssd_download/transmission_download/watch",
    "watch-dir-enabled": true
}
```

这里有配置的文字说明：

[Transmission 2.94 配置文件参数中文解释](https://blog.inkuang.com/2019/403/)

## 其他

我在之前出过一个下载失败的问题，是因为没有设置下载文件夹的权限。设置为 everyone 完全控制后就没问题了。