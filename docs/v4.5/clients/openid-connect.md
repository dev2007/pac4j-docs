# OpenID Connect

*pac4j* 允许你使用 OpenID Connect 协议 v1.0 登录。

它已经通过各种 OpenID Connect 提供者进行了测试：Google、AzureAD、Okta、IdentityServer3（以及 4）、MitreID、Keycloak 4.6 ……

## 1）依赖性

你需要使用以下模块：`pac4j-oidc`。

**示例（Maven 依赖项）**：

```xml
<dependency>
    <groupId>org.pac4j</groupId>
    <artifactId>pac4j-oidc</artifactId>
    <version>${pac4j.version}</version>
</dependency>
```

## 2）客户端

### a）间接客户端

对于任何 OpenID Connect 认证提供者，你应该使用通用 [OidcClient](https://github.com/pac4j/pac4j/blob/master/pac4j-oidc/src/main/java/org/pac4j/oidc/client/OidcClient.java)（或其子类之一）。它是基于 Web 浏览器的认证的间接客户端。配置是通过 [OidcConfiguration](https://github.com/pac4j/pac4j/blob/master/pac4j-oidc/src/main/java/org/pac4j/oidc/config/OidcConfiguration.java) 组件定义的。

**示例**：

```java
OidcConfiguration config = new OidcConfiguration();
config.setClientId(clientId);
config.setSecret(secret);
config.setDiscoveryURI(discoveryUri);
OidcClient oidcClient = new OidcClient(config);
```

在某些情况下（如示例中当发现 URL 已经知道时），你可以使用特定的客户端，例如 [Google](https://github.com/pac4j/pac4j/blob/master/pac4j-oidc/src/main/java/org/pac4j/oidc/client/GoogleOidcClient.java)、[Azure Active Directory](https://github.com/pac4j/pac4j/blob/master/pac4j-oidc/src/main/java/org/pac4j/oidc/client/AzureAdClient.java)、[Keycloak](https://github.com/pac4j/pac4j/blob/master/pac4j-oidc/src/main/java/org/pac4j/oidc/client/KeycloakOidcClient.java) 或 [Apple](https://github.com/pac4j/pac4j/blob/master/pac4j-oidc/src/main/java/org/pac4j/oidc/client/AppleClient.java)。

**示例**：

```java
OidcConfiguration configuration = new OidcConfiguration();
configuration.setClientId("788339d7-1c44-4732-97c9-134cb201f01f");
configuration.setSecret("we/31zi+JYa7zOugO4TbSw0hzn+hv2wmENO9AS3T84s=");
configuration.setDiscoveryURI("https://login.microsoftonline.com/38c46e5a-21f0-46e5-940d-3ca06fd1a330/.well-known/openid-configuration");
AzureAdClient client = new AzureAdClient(configuration);
```

由 OpenID Connect 提供者提供的 `clientId` 和 `secret`，以及 `discoveryUri`（用于认证提供者的元数据）。如果未定义 `discoveryUri`，则需要通过 `setProviderMetadata` 方法提供提供者元数据。

成功进行认证后返回 [OidcProfile](https://github.com/pac4j/pac4j/blob/master/pac4j-oidc/src/main/java/org/pac4j/oidc/profile/OidcProfile.java)（或其子类之一：[AzureAdProfile](https://github.com/pac4j/pac4j/blob/master/pac4j-oidc/src/main/java/org/pac4j/oidc/profile/azuread/AzureAdProfile.java)、[GoogleOidcProfile](https://github.com/pac4j/pac4j/blob/master/pac4j-oidc/src/main/java/org/pac4j/oidc/profile/google/GoogleOidcProfile.java) 或 [KeycloakOidcProfile](https://github.com/pac4j/pac4j/blob/master/pac4j-oidc/src/main/java/org/pac4j/oidc/profile/keycloak/KeycloakOidcProfile.java)）。即使你可以通过 `getIdToken()` 方法直接获取 ID Token，ID Token 中返回的所有属性都可在 `OidcProfile` 中获得。

你可以通过 `setResponseType` 和 `setResponceMode` 方法定义要使用的流：

```java
// implicit flow
config.setResponseType("id_token");
config.setResponseMode("form_post");
```

你可以通过 `setResponseType` 和 `setResponseMode` 方法定义要使用的流：

```java
// implicit flow
config.setResponseType("id_token");
config.setResponseMode("form_post");
```

默认情况下，`response_type` 设置为 `code`（授权代码流），`response_mode` 为空。

你可以用 `setScope` 方法定义使用的范围（`scope`）：

```java
config.setScope("openid email profile phone");
```

你可以通过以下方式请求使用 nonce 参数来增强安全性：

```java
config.setUseNonce(true);
```

### b）直接客户端

对于直接客户端（web 服务），你可以从任何 OpenID Connect 认证提供者获取 access token（访问令牌），并在请求中使用该令牌获取用户配置文件。

为此，[HeaderClient](https://github.com/pac4j/pac4j/blob/master/pac4j-http/src/main/java/org/pac4j/http/client/direct/HeaderClient.java) 将与 [UserInfoOidcAuthenticator](https://github.com/pac4j/pac4j/blob/master/pac4j-oidc/src/main/java/org/pac4j/oidc/credentials/authenticator/UserInfoOidcAuthenticator.java) 一起使用。

```java
OidcConfiguration config = new OidcConfiguration();
config.setClientId(clientId);
config.setSecret(secret);
config.setDiscoveryURI(discoveryUri);
UserInfoOidcAuthenticator authenticator = new UserInfoOidcAuthenticator(config);
HeaderClient client = new HeaderClient("Authorization", "Bearer ", authenticator);
```

对服务器的请求应具有值为 `Bearer｛access token｝`的 Authorization 头。

## 3）高级配置

你可以使用 `setClientAuthenticationMethod` 方法定义如何将客户端凭据（`clientId` 和 `secret`）传递给令牌端点：

```java
config.setClientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC);
```

在登录过程中验证 IDToken 时，可以设置时钟偏差：

```java
// 1 minute
config.setMaxClockSkew(60);
```

你还可以选择首选算法来签署 JSON web 令牌：

```java
config.setPreferredJwsAlgorithm(JWSAlgorithm.RS256);
```

最后，你可以使用 `addCustomParam`（String key、String value）方法设置其他参数：

```java
// select display mode: page, popup, touch, and wap
config.addCustomParam("display", "popup");
// select prompt mode: none, consent, select_account
config.addCustomParam("prompt", "none");
```

可以使用以下方法在配置中定义自定义 `state` 值：

```java
config.setWithState(true);
config.setStateData("custom-state-value");
```

此外，可以建立一种行为，根据该行为，当访问令牌到期时，本地会话将到期。为此，只需在配置中启用 `ExpireSessionWithToken` 即可。默认情况下禁用此行为。附加参数 `TokenExpirationAdvance`     允许设置令牌过期之前的时间（以秒为单位），其中会话过期提前。默认值为 0 秒。

```java
config.setExpireSessionWithToken(true);​​​​​
config.setTokenExpirationAdvance(10​​​​​​​​​);
```

> [原文链接](https://www.pac4j.org/4.5.x/docs/clients/openid-connect.html)
