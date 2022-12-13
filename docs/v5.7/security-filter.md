# 安全过滤器

为了保护 URL，需要一个安全过滤器来定义应用的认证/授权机制。

## 1）行为

默认情况下，它依赖于具有以下行为的 `DefaultSecurityLogic`：

- 如果 HTTP 请求与匹配器配置匹配（或未定义匹配器），则应用安全性。否则，将自动授予用户访问权限。
- 首先，如果用户未经过认证（没有数据 *profile*），并且在 clients 参数中定义了一些客户端，则尝试直接客户端登录。
- 然后，如果用户具有配置文件，则根据授权者配置检查授权。如果授权有效，则授予用户访问权限。否则，将显示 `403` 错误页面。
- 最后，如果用户没有经过认证（没有数据 *profile*），如果第一个定义的客户端是客户端配置中的间接客户机，则会将其重定向到适当的认证提供者。否则，将显示 `401` 错误页面。

设置 `401` HTTP 状态代码后，如果 `WWW-Authenticate` 头不存在（符合 HTTP 规范），则会添加一个值为：`Bearer ream="pac4j"` 的 `WWW-Authenticate` 头。如果 `WWW-Authenticate` 头不存在，则可以通过以下设置使用 `403` HTTP状态代码：`HttpActionHelper.setAlwaysUse401ForUnauthenticated(false);`。

## 2）选项

以下选项可用于安全过滤器。它们可以通过 `setter`、构造函数、`servlet` 参数等来定义，具体取决于 *pac4j* 的实现：

### a）配置

参阅[安全配置](/v5.7/config.html)

### b）客户端

这是用于认证的[客户端](/v5.7/clients.html)名称列表（用逗号分隔）的字符串。它是一个可选参数。

在所有情况下，此过滤器都要求用户经过认证。因此，如果客户端为空或未定义，则用户必须事先经过认证，否则返回 `401` 错误。

通过使用请求参数：`force_client`，可以在过滤器的所有已定义客户端中选择特定客户端。

### c）授权器

这是一个用于检查授权的[授权器](/v5.7/authorizer.html)名称列表字符串（用逗号分隔）。它是一个可选参数。

如果授权器为空或未定义，则将对 web 应用程序应用默认授权器：`csrfCheck`（至少定义了一个 `IndirectClient`），但不适用于 web 服务。如果未配置 `AnonymousClient`，则默认情况下也会应用 `isAuthenticated` 授权器。

你还可以使用[开箱即用的授权器](/v5.7/authorizer.html#默认授权器名称)，无需在安全配置中定义即可使用。以“+”开头 `authorizers` 字符串，将其他授权器添加到默认授权器中，或不替换它们。

### d）匹配器

这是请求必须满足的[匹配器](/v5.7/matcher.html)名称列表（用逗号分隔），以检查认证/授权。它是一个可选参数。

如果 `matchers` 为空或未定义，则默认情况下会匹配 `securityHeaders`，并且 `csrfToken` 仅适用于 web 应用程序（至少定义了一个 `IndirectClient`）。

你还可以使用[开箱即用的匹配器](/v5.7/matcher.html#_3-默认匹配器)，而无需在安全配置中定义它们。以“+”开头 `matchers` 字符串，将其他匹配器添加到默认匹配器中，或不替换它们。

## 3）高级选项

高级选项可设置为：

- `Config` 级别
- 直接在安全过滤器级别通过 `setter`、构造函数、`servlet` 参数等……取决于 *pac4j* 实现：

### a）sessionStore

你可以定义一个特定的 [SessionStore](/v5.7/session-store.html) 来替代 *pac4j* 默认实现。

### b）httpActionAdapter

你可以定义一个特定的 [HttpActionAdapter](/v5.7/http-action-adapter.html) 来替代 *pac4j* 默认实现。

### c）logoutLogic

你可以定义特定的 `SecurityLogic` 来替代默认的 `DefaultSecurityLogic`。

### d）webContextFactory

你可以定义特定的 [WebContextFactory](/v5.7/web-context.html)，来替代 *pac4j* 默认实现。

> [原文链接](https://www.pac4j.org/5.7.x/docs/security-filter.html)
