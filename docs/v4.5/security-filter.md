# 安全过滤器

为了保护 URL，*pac4j* 实现提供了安全过滤器，将工作委托给 `DefaultSecurityLogic` 组件。

## 1）行为

`DefaultSecurityLogic` 具有以下行为 ：

- 如果 HTTP 请求与匹配器配置匹配（或未定义匹配器），则应用安全性。否则，将自动授予用户访问权限。
- 首先，如果用户未经过认证（没有数据 *profile*），并且在 clients 参数中定义了一些客户端，则尝试直接客户端登录。
- 然后，如果用户具有配置文件，则根据授权者配置检查授权。如果授权有效，则授予用户访问权限。否则，将显示 `403` 错误页面。
- 最后，如果用户没有经过认证（没有数据 *profile*），如果第一个定义的客户端是客户端配置中的间接客户机，则会将其重定向到适当的认证提供者。否则，将显示 `401` 错误页面。

设置 `401` HTTP 状态代码后，如果 `WWW-Authenticate` 头不存在（符合 HTTP 规范），则会添加一个值为：`Bearer ream="pac4j"` 的 `WWW-Authenticate` 头。如果 `WWW-Authenticate` 头不存在，则可以通过以下设置使用 `403` HTTP状态代码：`HttpActionHelper.setAlwaysUse401ForUnauthenticated(false);`。

## 2）选项

以下选项可用：

### a）`config`

参阅[安全配置](/v4.5/config.html)

### b）`clients`

这是用于认证的[客户端](/v4.5/clients.html)名称列表（用逗号分隔）的字符串。它是一个可选参数。

在所有情况下，此过滤器都要求用户经过认证。因此，如果客户端为空或未定义，则用户必须事先经过认证，否则返回 `401` 错误。

通过使用请求参数：`force_client`，可以在过滤器的所有已定义客户端中选择特定客户端。

### c）`authorizers`

这是一个用于检查授权的[授权器](/v4.5/authorizer.html)名称列表字符串（用逗号分隔）。它是一个可选参数。

如果授权器为空或未定义，则将对 web 应用程序应用默认授权器：`csrfCheck`（至少定义了一个 `IndirectClient`）且对于 web 服务没有授权器应用。

你还可以使用[开箱即用的授权器](/v4.5/authorizer.html#默认授权器名称)，无需在安全配置中定义即可使用。以“+”开头 `authorizers` 字符串，将其他授权器添加到默认授权器中，或不替换它们。

### d）`matchers`

这是请求必须满足的[匹配器](/v4.5/matcher.html)名称列表（用逗号分隔），以检查认证/授权。它是一个可选参数。

如果 `matchers` 为空或未定义，则满足该条件，并且 `securityHeaders`、`csrfToken` 匹配器应用于 web 应用程序，或者 `securityHeaders` 匹配器适用于 web 服务。

你还可以使用[开箱即用的匹配器](/v4.5/matcher.html#_3-默认匹配器)，而无需在安全配置中定义它们。以“+”开头 `matchers` 字符串，将其他匹配器添加到默认匹配器中，或不替换它们。

### e）`multiProfile`

它指示是否必须同时保留多个认证（以及多个配置文件）。它是一个可选参数，默认为 `false`。

## 3）`ProfileStorageDecision`

在 `DefaultSecurityLogic` 组件中，你可以设置 `ProfileStorageDecision`，它定义与配置文件相关的决策，如果由直接客户端检索，我们是否必须从中读取这些决策并将其保存到 web 会话中：

- 默认情况下，将设置 [DefaultProfileStorageDecision](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/engine/decision/DefaultProfileStorageDecision.java)，它仅为间接客户端从 web 会话加载用户配置文件，而不会将配置文件保存到 web 会话中
- 也可以使用 [AlwaysUseSessionProfileStorageDecision](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/engine/decision/AlwaysUseSessionProfileStorageDecision.java) 以始终使用 web 会话。

>[原文链接](https://www.pac4j.org/4.5.x/docs/security-filter.html)
