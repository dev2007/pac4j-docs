# 回调端点

为了处理 web 应用程序的认证，*pac4j* 实现提供了一个回调端点，将工作委托给 `DefaultCallbackLogic` 组件。

对于间接客户端（如 Facebook），用户将被重定向到外部认证提供者进行登录，然后返回回调端点上的应用程序。

## 1）行为

`DefaultCallbackLogic` 具有以下行为 ：

- 从当前请求中提取凭据以获取用户配置文件（从认证提供者），然后将其保存（或不保存）在 web 会话中
- 最后，用户被重定向回最初请求的 URL（或 `defaultUrl`）。

## 2）选项

以下选项可用：

### a）`config`

参阅[安全配置](/v4.5/config.html)

### b）`defaultUrl`

如果没有原始请求的URL，则登录后是默认 URL。它是一个可选参数，默认情况下等于 `/`。

### c）`renewSession`

它指示登录后是否必须刷新 web 会话，以避免会话劫持。它是一个可选参数，默认为 `true`。

### d）`defaultClient`

它定义了如果 URL 上没有提供客户端，用于完成登录流程的默认客户端。它是一个可选参数，默认情况下未定义。

## 3）注销

使用[注销端点](/v4.5/logout-endpoint.html)，你可以触发本地和中央注销过程。然而，如果在认证提供程者中发生了“单点注销”过程，则该回调端点将接收注销请求（带有某些会话密钥）以销毁应用程序会话。

> [原文链接](https://www.pac4j.org/4.5.x/docs/callback-endpoint.html)
