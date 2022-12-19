# 客户端

客户端代表 web 认证机制。它执行登录流程并返回（如果成功）用户配置文件。大量客户端可用于：

- [OAuth 协议](/v5.6/clients/oauth.html)
- [SAML 协议](/v5.6/clients/saml.html)
- [CAS 协议](/v5.6/clients/cas.html)
- [OpenID Connect 协议](/v5.6/clients/openid-connect.html)
- [HTTP 协议](/v5.6/clients/http.html)
- [谷歌应用引擎（Google App Engine）支持](/v5.6/clients/google-app-engine.html)
- [Kerberos (SPNEGO Negotiate)协议](/v5.6/clients/kerberos.html)

虽然大多数客户端都是独立可用的，但 HTTP 客户端需要定义一个[认证器（Authenticator）](/v5.6/authenticators.html) 来处理凭证校验。

客户端（如授权者和匹配者）通常在[安全配置（security configuration）](/v5.6/config.html)中定义。

每个客户端都有一个以类名作为默认的名称（如 `FacebookClient`），但可以使用 `setName` 方法将其显式设置为另一个值。

理解以下主要特性：

- [直接客户端与间接客户端](/v5.6/clients.html#_1-直接客户端-vs-间接客户端)
- [计算角色和权限](/v5.6/clients.html#_2-计算角色和权限)
- [回调 URL](/v5.6/clients.html#_3-回调-url)
- [配置文件选项](/v5.6/clients.html#_4-配置文件选项)
- [AJAX 请求](/v5.6/clients.html#_5-ajax-请求)
- [Client 方法](/v5.6/clients.html#_6-client-方法)
- [原始请求的 URL](/v5.6/clients.html#_7-原始请求的-url)
- [静默登录](/v5.6/clients.html#_8-静默登录)

## 1）直接客户端 vs 间接客户端

客户端有两种：直接客户端（direct clients）用于 web 服务身份验证，间接客户端（indirect clients）用于 UI 身份验证。

以下是他们的行为和差异：

||直接客户端=web 服务认证|间接客户端=UI 认证|
|--|--|--|
|[认证流程](/v5.6/authentication-flows.html)|1）为每个 HTTP 请求传递凭据（传递给 “[安全过滤器](/v5.6/how-to-implement-pac4j-for-a-new-framework.html)”）|1） 原始请求的 URL 保存在会话中（通过“安全过滤器”）<br/> 2） 用户被重定向到身份提供者（identity provider）（通过“安全过滤器”）<br/> 3） 认证发生在身份提供者（`identity provider`）（或本地的 `FormClient` 和 `IndirectBasicAuthClient`）<br/> 4） 用户被重定向回调端点/URL（“回调端点”）<br/> 5） 用户被重定向到原始请求的 URL（通过“[回调端点](/v5.6/how-to-implement-pac4j-for-a-new-framework.html)”）|
|登录流程发生了几次？|通过定义的 [Authenticator](/v5.6/authenticators.html) 和 `ProfileCreator` 对每个 HTTP 请求（在“安全过滤器”中）进行认证。<br/>出于性能原因，可以通过将当前 `Authenticator` 包装在 `LocalCachingAuthenticator` 中来使用缓存，或者可以配置“安全过滤器”以在会话中保存配置文件（`ProfileStorageDecision`）|认证仅发生一次（在“回调过滤器”中）|
|默认情况下，用户配置文件保存在哪？|在 HTTP request 中（无状态）|在 web session 中（有状态）|
|凭据在哪里？|为每个 HTTP request 传递（由“安全过滤器”处理）|在认证提供者（`identity provider`）返回的回调端点上（由“回调端点”获取）|

## 2）计算角色和权限

要计算经过认证的用户配置文件合适的角色和权限，需要定义 [AuthorizationGenerator](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/authorization/generator/AuthorizationGenerator.java) 并将其附加到客户端。

**示例**：

```java
AuthorizationGenerator authGen = (ctx, session, profile) -> {
  String roles = profile.getAttribute("roles");
  for (String role: roles.split(",")) {
    profile.addRole(role);
  }
  return Optional.of(profile);
};
client.addAuthorizationGenerator(authGen);
```

你可以使用 `addAuthorizationGenerator` 方法添加任意数量的授权生成器，也可以使用 `setAuthorizationGenerators` 方法添加授权生成器列表。

## 3）回调 URL

对于间接客户端，必须定义将在登录流程中使用的回调 URL：成功登录后，身份提供者（identity provider）将用户重定向到回调 URL 的应用程序。

在此回调 URL 上，必须定义“回调端点”以完成登录流程。

由于回调 URL 可以在多个客户端之间共享，回调 URL 必须以查询参数或路径参数来保存客户端的信息（以便能够区分不同的客户端）。

**示例**：

```java
FacebookClient facebookClient = new FacebookClient(fbKey, fbSecret);
TwitterClient twitterClient = new TwitterClient(twKey, twSecret);
Config config = new Config("http://localhost:8080/callback", facebookClient, twitterClient);
```

在此例子中，`FacebookClient` 的回调 URL 是 `http://localhost:8080/callback?client_name=FacebookClient`，`TwitterClient` 的回调 URL 是 `http://localhost:8080/callback?client_name=TwitterClient`。

你必须在身份提供者一侧定义回调 URL。

这是由于客户端里的 [CallbackUrlResolver](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/http/callback/CallbackUrlResolver.java) 是 [QueryParameterCallbackUrlResolver](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/http/callback/QueryParameterCallbackUrlResolver.java)。

你可以通过 `QueryParameterCallbackUrlResolver` 的 `setClientNameParameter` 来变更参数 `client_name`。

但你也可以使用 [PathParameterCallbackUrlResolver](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/http/callback/PathParameterCallbackUrlResolver.java)，它可以添加客户端名称作为路径参数。

**示例**：

```java
OidcConfiguration configuration = new OidcConfiguration();
configuration.setClientId("788339d7-1c44-4732-97c9-134cb201f01f");
configuration.setSecret("we/31zi+JYa7zOugO4TbSw0hzn+hv2wmENO9AS3T84s=");
configuration.setDiscoveryURI("https://login.microsoftonline.com/38c46e5a-21f0-46e5-940d-3ca06fd1a330/.well-known/openid-configuration");
AzureAdClient azureAdClient = new AzureAdClient(configuration);
client.setCallbackUrlResolver(new PathParameterCallbackUrlResolver());
Clients clients = new Clients("http://localhost:8080/callback", azureAdClient);
Config config = new Config(clients);
```

在这个例子中，`AzureAdClient` 的回调 URL 是 `http://localhost:8080/callback/AzureAdClient`。

你甚至可以使用 `NoParameterCallbackUrlResolver`，它使回调 URL 保持不变。在这种情况下，不会向回调 URL 添加任何参数，也不会在回调端点上获取客户端。你将被迫在 `CallbackLogic` 级别定义一个“默认客户端”。

**示例**：

```java
defaultCallbackLogic.setClient("FacebookClient");
```

`CallbackUrlResolver` 依赖 [UrlResolver](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/http/url/UrlResolver.java)，能根据当前 web 上下文补全 URL。可以通过客户端的 `getUrlResolver()` 方法检索 `UrlResolver`。

你可以使用 [DefaultUrlResolver](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/http/url/DefaultUrlResolver.java) 并通过使用：`defaultUrlResolver.setCompleteRelativeUrl(true)` 来处理相对 URL。或者通过 `setUrlResolver` 方法提供自己的 `UrlResolver`。

## 4）配置文件选项

你可以通过 `setSaveProfileInSession` 方法控制配置文件是否保存在会话中。默认情况下，间接客户端配置为 `true`，直接客户端配置为 `false`。

你可以通过 `setMultiProfile` 方法（默认情况下为 `false`）控制配置文件是保存在现存验证过的配置文件之外还是替换现存的配置文件。

大多数客户端依赖 `Authenticator` 和 `ProfileCreator` 组件来验证凭据并创建用户配置文件。

在登录流程结束时，返回的用户配置文件由（内部）`Authenticator` 或 `ProfileCreator` 创建，后者保存 [配置文件定义](/v5.6/user-profile.html)。

可以使用 `setProfileDefinition` 方法重写配置文件定义。

## 5）AJAX 请求

对于间接客户端，如果用户尝试访问受保护的 URL，则会将其重定向到认证提供者（identity provider）进行登录。

但是，如果传入的 HTTP 请求是 AJAX 请求，则不会执行重定向，并返回 401 错误页面。

如果 `X-Requested-With` 头的值为 `XMLHttpRequest`，或者如果 `is_AJAX_request` 参数或头为 `true`，则 HTTP 请求被认为是 AJAX 请求。这是 [DefaultAjaxRequestResolver](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/http/ajax/DefaultAjaxRequestResolver.java) 的行为。

如果 `addRedirectionUrlAsHeader` 属性设置为 `true`，`DefaultAjaxRequestResolver` 将仅计算重定向 URL 并将其添加为头。

但你可以通过 `client.setAjaxRequestResolve(myAjaxRequestResolver)` 提供自己的 `AjaxRequestResolver`。

## 6）`Client` 方法

`Client` 接口有以下方法：

|方法|用途|
|--|--|
|`Optional<RedirectionAction> getRedirectionAction(WebContext context, SessionStore sessionStore)`|它返回重定向操作，将用户重定向到身份提供者进行登录。这只对间接客户有意义。<br/>通过 [RedirectionActionBuilder](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/redirect/RedirectionActionBuilder.java) 在内部计算用户到身份提供者的重定向|
|`Optional<Credentials> getCredentials(WebContext context, SessionStore sessionStore)`|它从 HTTP 请求中提取凭据并验证它们。
凭据的提取由 [CredentialsExtractor](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/credentials/extractor/CredentialsExtractor.java) 完成，而凭据验证由 [Authenticator](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/credentials/authenticator/Authenticator.java) 确保|
|`Optional<UserProfile> getUserProfile(Credentials credentials, WebContext context, SessionStore sessionStore)`|它构建经过身份验证的用户配置文件。<br/> 已验证用户配置文件的创建由 [ProfileCreator](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/profile/creator/ProfileCreator.java) 执行|
|`Optional<UserProfile> renewUserProfile(UserProfile profile, WebContext context, SessionStore sessionStore)`|它返回更新的用户配置文件|
|`Optional<RedirectionAction> getLogoutAction(WebContext context, SessionStore sessionStore, UserProfile currentProfile, String targetUrl)`|它返回重定向操作以调用身份提供者注销。<br/>注销重定向操作计算由 [LogoutActionBuilder](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/logout/LogoutActionBuilder.java) 完成|

客户端通常使用默认子组件填充：`RedirectionActionBuilder`、`CredentialExtractor`、`ProfileCreator`、`LogoutActionBuilder` 和 `Authenticator`，但必须明确定义 `Authenticator` 的 HTTP 客户端除外。当然，子组件还可以针对各种[定制](/v5.6/customizations.html)进行更改。

## 7）原始请求的 URL

原始请求的 URL 是在经过认证的过程开始之前调用的 URL：它在登录流程完成后由“回调端点”恢复。

它由 `SavedRequestHandler` 组件在 `DefaultSecurityLogic` 和 `DefaultCallbackLogic` 中处理。默认情况下，它是处理 GET 和 POST 请求的 `DefaultSavedRequestHandler`。

## 8）静默登录

使用 `IndirectClient` 时，登录流程可能会失败或在外部身份提供者层级被取消。

因此，不会创建用 配置文件，并且不授权对安全资源访问（401 错误）。

但是，如果登录流程失败或被取消，你可能仍然希望访问 web 资源。

为此，可以使用客户端的 `setProfileFactoryWhenNotAuthenticated 方法返回自定义配置文件，而不是无配置文件。

**示例**：

```java
myClient.setProfileFactoryWhenNotAuthenticated(p -> AnonymousProfile.INSTANCE);
```

::: danger 注意
在这种情况下，除非定义了合适的授权者，否则将授予整个 web 会话对所有安全资源的访问权限。
:::

> [原文链接](https://www.pac4j.org/5.6.x/docs/clients.html)
