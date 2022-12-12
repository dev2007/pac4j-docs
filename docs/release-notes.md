# 发行说明

## v5.7.1:

- 允许禁用 `DefaultCsrfTokenGenerator` 上的令牌旋转

## v5.7.0:

- `oauth.getProfileCreator()` 和 `oidc.getProfileCreator()` 能直接被用在 `ParameterClient`、`HeaderClient` 和 `DirectBearerAuthClient` 用于承载调用；弃用 `UserInfoOidcAuthenticator`
- 创建一个新的基于 OpenSAML v5 (JDK 17) 的 `pac4j-saml-opensamlv5` 模块
- 创建一个新的基于 Apereo CAS client v4 (JDK 17) 的 `pac4j-cas-clientv4` 模块
- 弃用旧模块（`pac4j-javaee`、`pac4j-cas` 、`pac4j-springboot` 和 `pac4j-saml`）
- SAML2 service provider 元数据生成器 可以通过 [Java’s ServiceLoader API](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/ServiceLoader.html) 被发现。
- 添加支持 `SAML2MongoMetadataGenerator` 用于通过 `pac4j-saml-opensamlv5` 管理 SAML2 元数据。
- 添加支持 `SAML2JdbcMetadataGenerator` 用于通过 `pac4j-saml-opensamlv5` 管理 SAML2 元数据。
- 添加 `LocalCachingProfileCreator`
- 添加 `PRIVATE_KEY_JWT` 客户端认证，用于支持 OIDC 协议
- 弃用用户配置文件中的 `permission` 概念

## v5.6.1:

- 允许重载 `DefaultLogoutLogic` 中的 `defaultUrl` 的 “computation”
- `logoutUrlPattern` 的安全修复

## v5.6.0:

- 为 Spring Boot v3 (JDK 17) 添加新的 `pac4j-springbootv3` 模块
- 可以控制是否 CSRF token 能作为一个属性（默认为 `true`），作为一个头（默认为 `false`）或作为一个 cookie（默认为 `true`），被添加 `CsrfTokenGeneratorMatcher`
- 从 `pac4j-saml` 模块移除所有的 `javax.annotation.Nullable` 和 `javax.annotation.Nonnull` 引用
- 在 `pac4j-core` 模块添加 `JEEAdapter` 类，基于 `pac4j-javaee` 或 `pac4j-jakartaee` 模块中的 `JEEAdapterImpl` 类
- 移除不期待的 “javax” 依赖
- 移除来自 `pac4j-cas` 模块的任意 `org.jasig.cas.client.util.CommonUtils` 引用
- 为 `Clients` 模块添加一个 `addClient` 方法
- 使 `SecurityEndpointBuilder` 的 `Config` 参数可选

## v5.5.0:

- 允许覆盖默认 `Matcher`（甚至是 `securityheaders` 快捷方式）
- 删除已弃用的 `pac4j-jee` 模块
- 允许包含 `PathMatcher` 的路径
- 添加 `Pac4jConstants.EMPTY_STRING` 常量
- 可以设置 `BadRequestAction`、`ForbiddenAction`、`StatusAction` 和 `UnauthorizedAction` 操作的内容
- 添加 `SessionStoreFactory` 的新概念，以取代任何直接的 `SessionStore` 实例化
- 添加 `SecurityEndpointBuilder` 以帮助从多个参数构建安全端点的配置
- 改进（SAML）用户属性类型处理
- 当无法从注销请求的上下文推断会话时，在 `DefaultLogoutHandler` 上使用 `destroySessionBack`
- 修复 `nosuchelement error` 上的“nosuchelement error”。

## v5.4.6:

- 默认情况下禁用 JWT 访问令牌解析，请使用 `OidcConfiguration.setIncludeAccessTokenClaimsInProfile` 以重新启用。
- nimbus-jwt 升级至 v9.24.2
- 弃用静态方法：`Config.set|defaultProfileManagerFactory(name,ProfileManagerFactory)`，以支持类方法：`config.set|defaultProfileManagerFactory(ProfileManagerFactory)`。添加 `config.defaultSessionStore(SessionStore)` 方法
- **升级至slf4j v2.0.0：小心，因为它可能会破坏日志记录！**

## v5.4.5:

- 已弃用 `new PathMatcher(regex)` 构造函数
- 修复 JWT 访问令牌解析上的 NPE

## v5.4.4:

- 修复了无角色或权限的 `RequireAnyRoleAuthorizer` 和 `RequireAnyPermissionAuthorizer` 的行为
- 允许 `DefaultSAML2MetadataSigner` 接受 `SAML2Configuration`
- 修复 `pac4j-springboot` 依赖
- OIDC 支持：如果访问令牌是有效的 JWT，则从其收集声明

## v5.4.3:

- 修复 [CVE-2022-22968](https://spring.io/blog/2022/03/31/spring-framework-rce-early-announcement)

## v5.4.2:

- 修复 [CVE-2022-22965](https://spring.io/blog/2022/03/31/spring-framework-rce-early-announcement)

## v5.4.0:

- 弃用 `pac4j-jee` 依赖项（基于 `javax.servlet-api` 库 v4 的 `org.pac4j.core` 和 `org.pac4j.saml` 包中的 JEE 组件），将其替换为：
  - `pac4j-javaee` 依赖（`org.pc4j.je` 包中的 JEE 组件，基于 `javax.servlet-api` 库 v4）或
  - `pac4j-jakartaee` 依赖（`org.pc4j.je` 包中的 JEE 组件，基于 `jakarta.servlet-api` 库 v5）
- 重构 SAML2 属性转换（从 SAML2 认证响应），以依赖 `SAML2Configuration` 级别上定义的 `AttributeConverter`
- 在 `pac4j-oidc` 中实现 RFC 9207 OAuth 2.0 授权服务器颁发者标识

## v5.3.1:

- 添加了 Cronof 支持（OAuth v2）
- 通过在创建令牌验证器时检查 OIDC 响应类型，完全修复 `CVE-221-44878`

## v5.3.0:

- `InitializableObject`：使用最大尝试次数和尝试之间的最小时间间隔跟踪和检查尝试次数和上次尝试时间（对于 CAS 实现）
- `InitializableObject`：允许重新初始化
- 重构 `CasOAuthWrapperClient` 配置

## v5.2.1:

- 将 `log4j-to-slf4j` 和 `log4j-api` 更新至 v2.17.0，尽管只有 `log4j-core` 存在安全漏洞

## v5.2.0:

- JEE 核心组件现在位于 `pac4j-jee` 依赖中（不再位于 `pac4j-core` 依赖中）
- `CVE-2021-44878`：加强 OIDC 协议支持的安全性：客户端必须显示接受 `none` 算法（`allowUnsignedIdTokens`）

## v5.1.5:

- 修复了 `SAML2AuthnResponseValidator` 上的 NPE
- 在 `OidcProfile` 上添加了 `setExpiration(Date)` 方法
- 修复了 `OidcProfile` 的 `expireSessionWithToken` 行为
- 将 CSRF cookie 的 `secure` 和 `httpOnly` 标志设置为 `true`
- 修复 `SAML2Profile` 中的多值属性重复

## v5.1.4:

- SAML2 配置现在可以接受自定义套接字工厂和主机名验证选项
- 能够通过安全筛选器级别的 `loadProfilesFromSession` 标志忽略现有认证。

## v5.1.3:

- 将 SAML 部分注销响应视为成功

## v5.1.2:

- 支持认证请求中的 SAML2 `Scoping `
- `WebContext` 现在可以直接提供请求 url
- 修复将 ADFS 用作 IdP 时的 SAML2 响应属性解析
- 为 OIDC 支持添加声明映射。

## v5.1.1:

- 已删除不再工作的 ORCID OAuth 客户端。改用 `OidcClient`
- 修复 PKCE OIDC 流程支持
- 正确解析 SAML 复杂属性
- 对于 CAS 服务器 OIDC 支持：允许禁用认证尝试检查

## v5.1.0:

- 可以选择强制 SAML2 认证提供者元数据解析器再次下载元数据。
- SAML2 认证提供者元数据解析器能够支持 URL 的 `last-modified` 属性。
- SAML2 响应验证现在可以通过向 `SAML2Configuration#configuration.setMaximumAuthenticationLifetime()`赋值零/负值来禁用 `authnInstance` 的验证。不应谨慎使用此设置。
- 可以随时在客户端组件中更改客户端

## v5.0.1:

- `SAMLMessageStore` 的基于 Hazelcast 的实现
- 添加了允许缺少 SAML 响应 `Destination` 属性的选项
- SAML 支持：如果友好名称与（映射的）名称相同，则不要添加友好名称（避免值重复）
- 改进嵌套属性的 JWT 解析

## v5.00（参阅：[pac4j v5有什么新功能？](https://www.pac4j.org/blog/what_s_new_in_pac4j_v5.html)）：

- 升级到 JDK 11
- 移除 `pac4j-saml-opensamlv3` 和 `pac4j-openid` 模块
- 移除弃用的方法和类
- 移除多数泛型
- 稍微重构了自动初始化
- 重构了会话管理（主要是 `ProfileManager` 和 `SessionStore`）：在 web 会话中读取不会创建它，而在会话中写入非空值总是会创建它。多配置文件和会话中保存配置文件或不保存配置文件选项现在可以在客户端级别定义，不再在“安全过滤器”和“回调端点”中定义。ProfileManager的 `get(readFromSession)`和 `getAll(readFromSession)` 方法被 `getProfile()` 和 `getProfiles()` 方法替代
- SAML 中央注销不再执行任何本地注销
- 当未定义授权器时，如果未使用 `AnonymousClient`，则默认授权器之一为 `isAuthenticated`
- 对 MongoDB、SQL、LDAP 和 CouchDB 的配置文件,`ProfileService` 支持进行 JSON 序列化（而不是使用 Java 序列化）；添加了 `JsonSerializer`，并将 `JavaSerializationHelper` 转换为 `JavaSerializer`；移除 `ProfileServiceSerializer`
- 在 POST 请求后 删除了新 POST 请求的 307 HTTP代码（改用 200）
- 将 `UserProfile` 组件转换为纯接口并尽可能使用它（尤其是在 `JwtGenerator` 和 `JwtAuthenticator` 中）
- 移除 `ProfileHelper.restoreOrBuildProfile` 方法以及由 `ProfileDefinition` 及其 `setRestoreProfileFromTypedId` 方法控制的行为（JWT 启用，其他禁用）
- 可以用“+”定义额外添加授权者和匹配者
- Xhelal Likaj 提出的 CSRF 安全改进([https://github.com/xhlika](https://github.com/xhlika))：更长的 CSRF 令牌值（32 字节），每个 HTTP 请求生成的 CSRF 令牌，具有内部过期日期（4 小时），CSRF 令牌验证可防止基于时间的攻击
- 改进了未经认证用户的响应：`401` 带有 “WWW-Authenticate” 头，或 `403` 以符合 HTTP 规范
默认授权者和匹配者可以由用户重新定义
- 从 `WebContext` 中分离出 `SessionStore`
- SAML2 元数据的签名操作现在可以使用现有的默认方法或通过 XMLSec 完成。签名者组件的选择可以通过 `SAML2Configuration` 来决定。
- 能够在 `SAML2Configuration` 和元数据中指定 SAML2SLO url。
- `SAML2Configuration` 中的选项可用于确定在使用 SAML2 响应进行端点验证时应如何比较 URL。
- 可以为 SAML2 注销验证提供一个预期的目的地（destination），以便不仅仅依赖于 SAML2 元数据中定义的 SLO 端点。
- SAML2 请求的认证上下文类引用现在被检查，并在 SAML 响应中强制再次执行。
- 如果 `SAML2Configuration` 配置为使用断言中的 SAML2 属性构建最终凭证，则 SAML2 响应中 `NameID` 元素的存在现在是可选的。如果未找到或未定义属性，则 `NameID` 应为默认值。
- 处理 cookie 中的“同一站点策略”（默认值：`lax`）。将 `ContextHelper` 重命名为 `WebContextHelper`
- 支持强制/被动认证的协议的认证请求现在可以使用预定义的 HTTP 属性根据每个请求进行修改，以控制发送给提供者的认证申请的类型。

---

## v4.5.7:

- `logoutUrlPattern` 中的安全修复

## v4.5.6:

- 修复 [CVE-2022-22965](https://spring.io/blog/2022/03/31/spring-framework-rce-early-announcement)

## v4.5.5:

- 修复 CVE-2021-44878

## v4.5.4:

- 升级 `log4j-to-slf4j` 和 `log4j-api` 至 v2.17.0，尽管只有 `log4j-core` 存在安全漏洞

## v4.5.1:

- 移除不再工作的 ORCID OAuth 客户端。改用 OidcClient
- 修复 PKCE OIDC 流程支持

## v4.5.0:

- 可以选择强制 SAML2 认证提供者元数据解析器再次下载元数据。
- SAML2 认证提供者元数据解析器能够支持 URL 的上次修改属性。
- 改进嵌套属性的 JWT 分析
- 避免 `JEEContext上cookie` 中的 cookies 里的 `null` 域的 NPE

## v4.4.0:

- 对于定义为文件的 SAML IdP 元数据，如果文件发生更改，则会重新加载元数据

## v4.3.0:

- 为属性添加了 `ChainingConverter`
- 修复 OIDC 协议的过期访问令牌

## v4.2.0:

- Apple SignIn支持（OIDC协议）
- `ProfileService` 支持 MongoDB、SQL、LDAP 和 CouchDB 的 JSON 序列化配置文件（而不是使用 Java 序列化）

## v4.1.0（参阅：[pac4j v4.1中的新功能？](https://www.pac4j.org/blog/what_s_new_in_pac4j_v4_1.html)）：

- `RememberMeAuthorizationGenerator` 已弃用，将在下一版本（v5）中删除
- OpenID 支持（`YahooOpenIdClient`）已弃用，将在下一版本（v5）中删除
- `ProfileManagerFactory2` 已弃用，将在下一版本（v5）中删除
- 移除 `InternalAttributeHandler`
- web 服务的默认匹配器/授权器是 `securityHeaders`/`none`，而不是 web 应用程序的 `csrfToken`、`securityHeaders`/`csrfCheck`

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

> [原文链接](https://www.pac4j.org/5.7.x/docs/release-notes.html)
