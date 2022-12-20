# 发行说明

## v4.0.3:

- 修复 SAML 生成的证书的到期日期
- 为 OpenID Connect 协议添加了新的 `ValueRetriever` 接口及其实现 `SessionStoreValueRetrieve`
- 为 OpenID Connect 协议 [RFC-7636](https://tools.ietf.org/html/rfc7636) 添加了对 PKCE 的支持
- 改进了 `OidcProfile` 中过期令牌的处理

## v4.0.2:

- 修复收到 SAML 注销响应时的 `ClassCastException`
- 将访问令牌作为 `GithubClient` 的头发送
- CAS 前通道注销：修复注销后的401错误
- 修复 `CasClient` 中的默认 `CallbackUrlResolver`

## v4.0.1:

- 类型参数：`ClientFinder` 的 `find` 方法的返回值中添加 `? extends Credentials` 类型参数，and `ProfileManagerFactoryAware*` 的 `getProfileManager` 方法的返回类型中为 `ProfileManager` 添加 `UserProfile` 类型参数
- 为 `Color` 添加 `setter`
- 拉取 `pac4j-saml-opensamlv3` 依赖，而不是 `pac4j-saml` 依赖
- 删除废弃的行为：通过 `ProfileManager` 在请求或会话中检索一个 `CommonProfile`，并检索字符串作为请求的 URL
- 用于安全性的默认客户端名称参数具有一个新值（`force_client`），以避免与回调中使用的默认客户端名参数（`client_name`）冲突（旧值仍用作回退，但将被删除）
- 允许 `pac4j-saml` 使用 REST API 存储和生成 SAML 元数据和密钥库，并提供可扩展性选项，以便可以设计和注入自定义组件以从外部管理元数据工件。- 可以控制/覆盖 SAML2 认证提供者元数据的解析。
- 处理请求所在的 `JEEContext` 的一个奇怪用例： `request.getRequestURI()` 返回以双斜杠开头的路径
- 当认证失败或被取消时，可以返回自定义配置文件（“静默登录”）
- 修复 CAS 注销 URL 计算（用于不带前缀的中央注销）
- 介绍 `WebContextFactory` 概念和 `JEEContextFactory` 实现

## v4.0.0:

- 改进了配置文件管理器配置
- 将 J2E 组件重命名为 JEE
- 已开始通过 Renovate 更新依赖
- 客户端可以返回任何类型的配置文件（使用自定义 `AuthorizationGenerator` 或 `ProfileCreator`），甚至可以返回最小的用户配置文件（`UserProfile`）
- HTTP 操作不再自动应用于 web 上下文（`setResponseStatus` 和 `writeResponseContent` 方法已从 WebContext 接口中删除），必须为此使用 `HttpActionAdapter`。创建多个 HTTP 操作（继承自 `HttpAction`）来处理必要的 HTTP 操作。`RedirectAction` 被继承自 `RedirectionAction` 的新 HTTP 操作替换。`redirect` 方法重命名为 `getRedirectionAction`
- 默认情况下，除了 POST 请求外，CSRF 检查还应用于 PUT、PATCH 和 DELETE 请求
- 将 `SAMLMessageStorage*` 类重命名为 `SAMLMessageStore*`（基于 `Store`）
- 对于 `Google2Client`，更改配置文件 URL `https://www.googleapis.com/plus/v1/people/me` 到 `https://www.googleapis.com/oauth2/v3/userinfo`。这一变化是为关闭 Google Plus API 做准备。此更改将删除 `Google2Client` 的 `birthday` 和 `emails` 属性。
- 对于 AJAX 请求，仅在请求时生成重定向URL（`DefaultAjaxRequestResolver` 的 `addRedirectionUrlAsHeader` 属性）
- 更新了 API 以使用 `Optional` 替代 `null`
- 在 POST 请求后使用 `303 "See Other"` 和 `307 "Temporary Redirect"` HTTP 操作（`RedirectionActionHelper`）
- 使用 POST 方法处理原始请求的 URL
- 添加 HTTP POST 简单签名协议实现
- 正确处理多个 OIDC 客户端的状态和随机数
- 配置文件过期时，其客户端可以续订该配置文件
- 大多数 web 授权器现在都是匹配者。默认匹配器是 “securityHeaders，csrfToken”，默认授权器是 “csrfCheck”。使用 “none” 表示没有匹配者或授权者
- 使用 `FindBest` 实用程序类查找最佳适配器、逻辑……
- 支持 OIDC 后通道和前通道注销
- 通过 `getLikeDefaultSecurityLogic` 和 `getAllLikeDefaultSecurityLogic` 方法在 `ProfileManager`（无论是否从会话）中加载配置文件，就像在 `DefaultSecurityLogic` 中一样
- REVERT：移除 `removeLogData` 方法中的 ID 令牌（以前为 `clearSentiveData`）
- `pac4j-saml` 模块保存为传统的 `pac4j-saml-opensamlv3` 模块，并升级到 JDK 11 和 OpenSAML v4

## v3.9.0：

- `ProfileService` 支持为 MongoDB、SQL、LDAP 和 CouchDB 的 JSON 序列化配置文件（而不是使用 Java 序列化）

## v3.8.3：

- 由于 [CVE-2019-17195](https://connect2id.com/blog/nimbus-jose-jwt-7-9)，将 `nimbus-jose-jwt` 库升级至 7.9 版

## v3.8.2：

- 添加可自定义的 SAML 注销后 URL
- 默认情况下，SAML身份验证请求中不能包含QualifiedName
- 向 SAML 客户端添加了重放保护。
- 修复 SAML 签名验证 w.r.t WantAssertionsSigned 处理。现在始终需要签名，即使禁用了 WantAssertionsSigned。WantAssertionsSigned 现在要求对断言进行显式签名，而不是对响应进行显式签署。
- 为认证响应添加了对 SAML 制品绑定的支持。
- 在配置元数据时签名，并打开元数据生成 API 进行自定义。
- 使用 REDIRECT 绑定时，切勿使用 XMLSig对AuthnRequest 进行签名，签名是通过 Signature 查询参数完成的。
- 增加了对 LinkedIn v2 API 的支持
- 增加了对 FigShare 的支持

## v3.7.0：

- 修复 SAML SP 元数据签名
- CAS 改进：更好的服务请求检测，支持 CAS 服务器方法参数
- 修复使用 JWT 的 CasRestProfile
- 添加 HTTP POST 简单签名协议实现
- 未定义时，基于 `HttpMethodMatcher` 添加 `get`、`post`、`put` 和 `delete` 匹配器

## v3.6.1:

- 修复 Google OAuth 支持

## v3.6.0：

- 可以在SAML协议支持中设置多个authn上下文类引用
- 对于 Google2Client，从 `https://www.googleapis.com/plus/v1/people/me` 到 `https://www.googleapis.com/oauth2/v3/userinfo`。这一变化是为关闭 Google Plus API 做准备。此更改将使 `birthday` 属性返回 `null`，而 `emails` 属性将解析 `Google2Client` 的单个 `email` 属性。
- 通过 `destroy` 方法彻底关闭 `SAML2Client`
- 不清除 `OidcProfile` 中作为敏感数据的 ID 令牌
- 改进 SAML 元数据的签名和摘要方法
- 增强 OAuth 2 通用支持
- 使用 NameID 作为 SAML SLO 支持的 SessionIndex 的回退

## v3.5.0：

- 添加了 `UserInfoOidcAuthenticator`，以根据从 OpenID Connect 登录过程接收的访问令牌对用户进行认证
- 更新了 OpenID Connect/JWT 依赖（v6）
- 已添加 `DirectBearerAuthClient`
- 处理了注销响应（SAML）中的 `inResponseTo` 和 `RelayState`
- 将 `trustedClasses` 添加到 `JavaSerializationHelper`

## v3.4.0：

- 增加了授权器组合的能力（连接或分离）
- SAML SLO 支持 SOAP（仅限入站）、HTTP-POST 和 HTTP-Redirect 绑定
- OpenID Connect 的改进：从认证服务器支持多种 JWS 算法，检索 Keyclock 角色

## v3.3.0：

- 改进 SAML 支持：始终返回一个默认密钥，该密钥为私有密钥，在 SP 元数据中添加 SingleLogoutService URL，使本地和中央注销协同工作，允许将属性映射到新名称
- 对于 OAuth、OpenID Connect 和 SAML 协议，你自己的 `StateGenerator` 可以覆盖默认状态生成
- SAML 认证模块中的自定义 OpenSAML 引导
- X509 证书支持

## v3.2.0：

- 允许设置 `GenericOAuth20Client` 的 `profileId`
- 修复了 OAuth v2.0 支持中的 `setConfiguration` 方法名称
- 在SAML SP 元数据中可选签名或指定请求的属性
- 更新至 Scribejava v5.6.0
- 添加了对 HiOrg-Server（OAuth）的支持
- 修改了用于提取用户配置文件的 OAuth 错误处理。现在，将引发异常，而不是返回空配置文件
- 修复A `HiOrg-Server` 名称和 `Access-Control-Allow-Credentials` 头验证

## v3.1.0：

- 为用户配置文件添加了属性合并功能：具有相同名称和集合类型值的多个属性可以合并为一个属性
- 增加了微博、QQ和微信（OAuth）支持

## v3.0.3：

- `AzureAdClient` 默认使用 `PathParameterCallbackUrlResolver`

## v3.0.2：

- 正确处理 J2EContext 的 `setResponseStatus` 方法中的所有 HTTP 代码
- 将 `setExcludedPath`和 `setExcludedPattern` 方法添加到 `PathMatcher` 类（用于 Shiro）

## v3.0.1：

- `ProfileHelper.flatIntoOneProfile` 方法返回 `AnonymousProfile`（而不是空），如果它是唯一的配置文件

## v3.0.0：

- 在 OpenID Connect 注销中处理 AJAX 请求
- 所有会话交互都通过SessionStore完成（从WebContext中检索）
- 所有异常（特别是 HttpAction）都是 `unchecked`
- 升级依赖
- 增加了“多租户”功能：你可以为同一个客户端动态定义多个回调 URL，除了 SAML，你需要的 `SAML2Client` 数量与所需的不同回调 URL 数量一样多
- `CallbackUrlResolver` 基于计算 URL 的 `UrlResolver` 计算回调 URL（使用查询参数或路径参数定义客户端）
- 你可以在逻辑级别定义错误（页面）URL 以处理不期待的异常
- SAML Keystore 别名可以通过属性定义；SAML 日期比较现在基于 UTC
- 未在凭据级别设置客户端名称
- `AzureAdProfile` 的用户名是 UPN
- 生成发布时间，JWT 可以使用到期日期
- OpenID Connect 用户配置文件可能已过期
- 在 J2EContext 中，以不区分大小写的方式检查头名称
- 支持 `javax.faces.partial.ajax` 请求的 AJAX 参数
- 如果配置中仅定义了一个客户端，则将其用作安全和回调端点上的回退

*较老的发行说明已删除。*

> [原文链接](https://www.pac4j.org/4.0.x/docs/release-notes.html)
