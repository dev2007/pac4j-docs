# 安全配置

必须通过 [Config](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/config/Config.java) 对象定义安全配置。

## 1）基础

它收集了所需的：

- [客户端](/v5.7/clients.html)（认证机制）
- [认证器](/v5.7/authenticators.html)（凭证校验）
- [授权器](/v5.7/authorizers.html)（授权检查）
- [匹配器](/v5.7/matchers.html)

**示例**：

```java
FacebookClient facebookClient = new FacebookClient("145278422258960", "be21409ba8f39b5dae2a7de525484da8");
TwitterClient twitterClient = new TwitterClient("CoxUiYwQOSFDReZYdjigBA", "2kAzunH5Btc4gRSaMr7D7MkyoJ5u1VzbOOzE8rBofs");

Config config = new Config("http://localhost:8080/callback", facebookClient, twitterClient);

config.addAuthorizer("admin", new RequireAnyRoleAuthorizer("ROLE_ADMIN"));
config.addAuthorizer("custom", new CustomAuthorizer());

config.addMatcher("excludedPath", new ExcludedPathMatcher("^/facebook/notprotected\\.jsp$"));
```

`http://localhost:8080/callback` 是回调端点的 URL。这仅对间接客户端是必需的，并且可以对 web 服务删除：

```java
ParameterClient parameterClient = new ParameterClient("token", new JwtAuthenticator(salt));

Config config = new Config(parameterClient);
```

## 2）客户端

你还可以使用中间 [Clients](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/client/Clients.java) 对象来构建 `Config` 对象。

**示例**：

```java
Clients clients = new Clients("http://localhost:8080/callback", facebookClient, twitterClient, parameterClient);

Config config = new Config(clients);
```

在这种情况下，你可以为**所有**客户端定义：

- 相同的回调 URL、`UrlResolver` 和 [CallbackUrlResolver](/v5.7/clients.html#_3-回调-URL):`clients.setCallbackUrl(callbackUrl)`，`clients.setUrlResolver(urlResolver)` 和 `clients.setCallbackUrlResolver(callbackUrlResolver)`
- 相同的 [AjaxRequestResolver](/v5.7/clients.html#_5-AJAX-请求)：`clients.setAjaxRequestResolver(ajaxRequestResolver)`
- 相同的 [AuthorizationGenerator](/v5.7/clients.html#_2-计算角色和权限): `clients.addAuthorizationGenerator(authorizationGenerator)`

## 3）高级

你可以在 Config 级别定义安全过滤器和回调/注销端点将使用的几个组件：

- `config.setProfileManagerFactory(x)` 用于从 `WebContext` 构建 [ProfileManager](/v5.7/profile-manager.html)
- `config.setSessionStore(x)` 用于设置一个指定的 [SessionStore](/v5.7/session-store.html)
- `config.setHttpActionAdapter(x)` 用于设置一个指定的 [HttpActionAdapter](/v5.7/http-action-adapter.html)
- `config.setSecurityLogic(x)` 用于设置一个指定的 `SecurityLogic`
- `config.setCallbackLogic(x)` 用于设置一个指定的 `CallbackLogic`
- `config.setLogoutLogic(x)` 用于设置一个指定的 `LogoutLogic`
- `config.setWebContextFactory(x)` 用于设置一个指定的 [WebContextFactory](/v5.7/web-context.html)。

> [原文链接](https://www.pac4j.org/5.7.x/docs/config.html)
