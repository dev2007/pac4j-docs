# 注销端点

要处理注销，需要执行注销端点：

- 通过从会话中删除 pac4j profile 实现本地注销
- 通过调用认证提供者注销端点实现中央注销。这是单点注销（Single-Log-Out=SLO）过程。

## 1）行为

默认情况下，它依赖于具有以下行为的 `DefaultLogoutLogic`：

- 如果 `localLogout` 属性为 `true`，*pac4j* profile 将从 web 会话中删除（如果 `destroySession` 属性为 `true` 则 web 会话将被销毁）
- 如果注销后操作与 `logoutUrlPattern` 匹配，则将其计算为 `url` 请求参数的重定向；如果定义了默认 url，则将它计算为 `defaultUrl`；否则将其作为空白页
- 如果 `centralLogout` 属性为 `true`，则会将用户重定向到认证提供者进行中央注销，然后可选地重定向到注销后重定向 URL（如果认证提供者支持并且是绝对 URL）。如果未定义中央注销，则直接执行注销后操作。

## 2）选项

以下选项可用于注销端点。它们可以通过 `setter`、构造函数、`servlet` 参数等来定义，具体取决于 *pac4j* 的实现：

### a）`config`

参阅[安全配置](/v5.7/config.html)

### b）`defaultUrl`

如果未提供 `url` 请求参数或 `url` 与 `logoutUrlPattern` 不匹配，则为默认的注销 URL。它是一个可选参数，默认情况下未定义。

### c）`logoutUrlPattern`

`url` 参数必须匹配的注销 URL 模式。它是一个可选参数，默认情况下只允许相对 URL。

### d）`localLogout`

它指示是否必须执行本地注销。它是一个可选参数，默认为 `true`。

### e）`destroySession`

它定义了在本地注销期间是否必须销毁 web 会话。它是一个可选参数，默认为 `false`。

### f）`centralLogout`

它定义是否必须执行中央注销。它是一个可选参数，默认为 `false`。

## 3）来自认证提供者的注销请求

在中央注销的情况下，认证提供者处发生的 SLO（单点登出）过程将向应用程序发送注销请求。然而，这些注销请求将由[回调端点](/v5.7/callback-endpoint.html)而不是此注销端点接收。

## 4）高级选项

高级选项可在以下地方设置：

- `Config` 级别
- 直接在注销端点级，通过 `setter`、构造函数、`servlet` 参数等……取决于 *pac4j* 实现：

### a）sessionStore

你可以定义一个特定的 [SessionStore](/v5.7/session-store.html) 来替代 *pac4j* 默认实现。

### b）httpActionAdapter

你可以定义一个特定的 [HttpActionAdapter](/v5.7/http-action-adapter.html) 来替代 *pac4j* 默认实现。

### c）logoutLogic

你可以定义特定的 `LogoutLogic` 替代默认的 `DefaultLogoutLogic`。

### d）webContextFactory

你可以定义特定的 [WebContextFactory](/v5.7/web-context.html)，来替代 *pac4j* 默认实现。

> [原文链接](https://www.pac4j.org/5.7.x/docs/logout-endpoint.html)
