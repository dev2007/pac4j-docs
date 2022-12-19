# CAS

*pac4j* 允许你以多种方式登录 CAS 服务器：

1. 使用 **CAS 登录页面**（用于 web 网站）：当访问受保护的网站时，用户将被重定向到 CAS 登录页面，以输入其凭据，然后才被授予访问该网站的权限
2. 使用**代理票证**（对于 web 服务）：如果用户已经在 web 应用程序中通过了 CAS 的身份验证（用例1），则 web 应用程序可以请求代理票证并使用它调用受 CAS 保护的 web 服务
3. 使用 **CAS REST API**（用于 web 服务）：独立/移动应用程序可以通过提供 CAS 用户凭据来调用 web 服务（这些凭据将通过 CAS REST API 直接检查）

它支持所有 CAS 协议版本（v1.0、v2.0 和 v3.0）。

:::danger 注意
CAS 服务器还可以充当 SAML IdP 或 OpenID Connect 提供者。在这种情况下，你不能使用 CAS 支持，而必须使用适当的 SAML 或 OpenID Connect 支持。
:::

## 0）依赖

你需要使用以下模块：`pac4j-cas`。

**示例（Maven 依赖）**：

```xml
<dependency>
    <groupId>org.pac4j</groupId>
    <artifactId>pac4j-cas</artifactId>
    <version>${pac4j.version}</version>
</dependency>
```

## 1）CAS 登录页面（web 网站）

### a）应用配置

要使用 CAS 服务器登录，必须定义间接 [CasClient](https://github.com/pac4j/pac4j/blob/master/pac4j-cas/src/main/java/org/pac4j/cas/client/CasClient.java)（也可以定义 [CasProxyReceptor](https://github.com/pac4j/pac4j/blob/master/pac4j-cas/src/main/java/org/pac4j/cas/client/CasProxyReceptor.java) 来代理处理）。因此，受 `CasClient` 保护的 web 应用程序将参与 SSO。

必须在 [CasConfiguration](https://github.com/pac4j/pac4j/blob/master/pac4j-cas/src/main/java/org/pac4j/cas/config/CasConfiguration.java) 对象中定义 CAS 配置。

**示例**：

```java
CasClient casClient = new CasClient(new CasConfiguration("https://mycasserver/login"));
```

`https://mycasserver/login` 是你的 CAS 服务器的登录 URL。

成功登录 CAS 服务器后，会返回 [CasProfile](https://github.com/pac4j/pac4j/blob/master/pac4j-cas/src/main/java/org/pac4j/cas/profile/CasProfile.java)。

如果在 CAS 中发生认证委派，并且未定义代理配置，则返回的配置文件将是认证委派后的原始配置文件。

`CasConfiguration` 可以使用 CAS 登录 URL 和/或 CAS 前缀 URL 构建（当需要不同的 URL 时）：

```java
CasConfiguration config = new CasConfiguration();
config.setLoginUrl("https://casserverpac4j.herokuapp.com/login");
config.setPrefixUrl("http://internal-cas-url");
```

你可以定义要使用的 CAS 协议（默认情况下为 `CasProtocol.CAS30`）：

```java
config.setProtocol(CasProtocol.CAS20);
```

你还可以设置各种参数：

|方法|用途|
|--|--|
|setEncoding(String)|定义用于处理 CAS 响应的编码|
|setRenew(boolean)|定义是否使用刷新参数|
|setGateway(boolean)|定义是否使用网关参数|
|setTimeTolerance(long)|定义 SAML 票据校验 (CasProtocol.SAML)的容忍时长|
|setCallbackUrlResolver(CallbackUrlResolver)|定义一个特定的 `CallbackUrlResolver` （默认使用 `CasClient` 的 `CallbackUrlResolver`)|
|setDefaultTicketValidator(TicketValidator)|定义默认使用的 `TicketValidator`|

此外，还可以基于 `RedirectionActionBuilder#ATTRIBUTE_FORCE_AUTHN` 和 `RedirectionAction Builder#ATTRIBUTE_PASSIVE` 中定义的存在的 HTTP 属性，基于每个请求控制刷新或网关认证请求。

### b）CAS 配置

假定你的回调 URL 是 `http://localhost:8080/callback`，CAS 服务器默认会被 `https://mycasserver/login?service=http://localhost:8080/callback?client_name=CasClient` 调用。

因此，你必须在 CAS 服务注册表中定义与此 URL 匹配的合适的 CAS 服务：`http://localhost:8080/callback?client_name=CasClient`，并且使用适当的配置：返回哪些属性？它支持代理吗？

阅读 [CAS 文档](https://apereo.github.io/cas/6.2.x/services/Service-Management.html)了解。

### c）代理支持

对于代理支持，必须使用 `CasProxyReceptor` 组件，在相同或新的回调 URL 上定义（通过[安全配置](/v5.7/config.html)），并在 `CasConfiguration` 中声明：

```java
CasProxyReceptor casProxy = new CasProxyReceptor();
config.setProxyReceptor(casProxy);
// config.setAcceptAnyProxy(false);
// config.setAllowedProxyChains(proxies);
```

在这种情况下，成功认证后会返回 [CasProxyProfile](https://github.com/pac4j/pac4j/blob/master/pac4j-cas/src/main/java/org/pac4j/cas/profile/CasProxyProfile.java)，它可以用于获取其他 CAS 服务的代理票据：

```java
CasProxyProfile casProxyProfile = (CasProxyProfile) casProfile;
String proxyTicket = casProxyProfile.getProxyTicketFor(anotherCasServiceUrl);
```

为了关联代理信息，`CasProxyReceptor` 使用一个内部[存储](/v5.7/store.html)，你可以通过 `setStore` 方法更改该存储（默认情况下，使用 `Guava`）。

### d）注销配置

为了处理 CAS 注销请求，会自动创建 [DefaultLogoutHandler](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/logout/handler/DefaultLogoutHandler.java)。除非你指定自己的 [LogoutHandler](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/logout/handler/LogoutHandler.java) 接口实现。

`DefaultLogoutHandler`：

- 依赖于 `SessionStore` 的功能（`destroySession`、`getTrackableSession` 和 `buildFromTrackableSession` 方法）
- 将数据存储在可以通过 `setStore` 方法更改的[存储](/v5.7/store.html)中（默认情况下，使用 `Guava`）。

### e）无状态方式

事实上，你甚至可以使用 [DirectCasClient](https://github.com/pac4j/pac4j/blob/master/pac4j-cas/src/main/java/org/pac4j/cas/client/direct/DirectCasClient.java) 登录 CAS 登录页面。不涉及回调 URL：请求的 URL 将在 CAS 登录后回调。不会创建会话，因此不需要注销。

## 2）代理票据（web 服务）

如果要通过 CAS 认证从 web 应用程序调用 web 服务，则必须按照上述说明使用代理模式。

生成的代理票据必须发送到 web 服务，并且 web 服务必须由 [DirectCasProxyClient](https://github.com/pac4j/pac4j/blob/master/pac4j-cas/src/main/java/org/pac4j/cas/client/direct/DirectCasProxyClient.java) 正确保护。它必需 `CasConfiguration`。

**示例**：

```java
CasConfiguration config = new CasConfiguration();
config.setLoginUrl("https://casserverpac4j.herokuapp.com/login");
config.setProtocol(CasProtocol.CAS30_PROXY);
DirectCasProxyClient directCasProxyClient = new DirectCasProxyClient(config, "http://localhost:8080/webservices");
```

生成代理票据（如 `PT-1`）后，将在类似的 URL 上调用 web 服务：`http://localhost:8080/webservices/myoperation?ticket=PT-1`。

可以在 `CasConfiguration` 对象上的 `setAllowedProxies`（`List<String>`）方法定义 URL 模式列表，它可以允许哪些应用程序充当此应用程序的代理。

`DirectCasProxyClient` 将验证代理票据和服务 URL（在构造函数中定义：`http://localhost:8080/webservices`)以获取用户的身份。

这需要定义适当的 CAS 服务（匹配 `http://localhost:8080/webservicesURL`）。

此 `DirectCasProxyClient` 内部依赖于 [CasAuthenticator](https://github.com/pac4j/pac4j/blob/master/pac4j-cas/src/main/java/org/pac4j/cas/credentials/authenticator/CasAuthenticator.java)。了解如何[处理性能问题](/v5.7/authenticators.html#_1-处理性能问题)。

## 3）CAS REST API（web 服务）

如果启用了该功能，则可以通过 [REST API](https://apereo.github.io/cas/6.2.x/protocol/REST-Protocol.html) 调用 CAS 服务器。

[CasRestFormClient](https://github.com/pac4j/pac4j/blob/master/pac4j-cas/src/main/java/org/pac4j/cas/client/rest/CasRestFormClient.java) 和 [CasRestBasicAuthClient](https://github.com/pac4j/pac4j/blob/master/pac4j-cas/src/main/java/org/pac4j/cas/client/rest/CasRestBasicAuthClient.java) 是直接客户端，可用于与 CAS 服务器的 REST API 交互：

- 如果用户的用户名/密码是通过基本身份验证发送的，`CasRestBasicAuthClient` 将获取它们并通过 CAS REST API 进行验证
- 如果凭证是通过表单参数发送的，`CasRestFormClient` 将接收凭证并通过 CAS REST API 进行验证。

**示例**：

```java
CasConfiguration casConfig = new CasConfiguration("https://mycasserver/login");
CasRestFormClient casRestClient = new CasRestFormClient(casConfig);
```

这些直接客户端在内部依赖 [CasRestAuthenticator](https://github.com/pac4j/pac4j/blob/master/pac4j-cas/src/main/java/org/pac4j/cas/credentials/authenticator/CasAuthenticator.jav)。了解如何[处理性能问题](/v5.7/authenticators.html#_1-处理性能问题)。

通过 `CasRestBasicAuthClient`/`CasRestFormClient` 成功验证后，将创建 `CasRestProfile`。

此配置文件没有属性，因为它是通过在 REST API 上验证 CAS 凭据而构建的。你必须请求服务票据并对其进行验证，才能获得具有属性的 `CasProfile`（因为使用的默认协议是 CAS v3.0）。

事实上，使用 `CasRestProfile`，你将能够：

- 请求服务票据：`TokenCredentials tokenCredential=casRestClient.requestServiceTicket(serviceUrl,casRestProfile,context)`
- 验证它们：`CasProfile casProfile = casRestClient.validateServiceTicket(serviceUrl, tokenCredentials, context)`
- 或销毁以前的身份验证：`CasProfile casProfile = casRestClient.validateServiceTicket(serviceUrl, tokenCredentials, context)`。

> [原文链接](https://www.pac4j.org/5.0.x/docs/clients/cas.html)
