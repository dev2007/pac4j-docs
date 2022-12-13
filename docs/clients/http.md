# HTTP

*pac4j* 允许你通过 HTTP 机制登录（如基本认证或表单传递）。

HTTP  客户端需要定义一个[认证器](/authenticators.html)来处理凭据验证。

除了具有默认 `X509Authenticator` 的 `X509Client`，它从 X509 证书的 `subjectDN` 中提取标识符。

## 1）依赖

你需要使用以下模块：`pac4j-http`。

```xml
<dependency>
    <groupId>org.pac4j</groupId>
    <artifactId>pac4j-http</artifactId>
    <version>${pac4j.version}</version>
</dependency>
```

## 2）客户端

你可以使用以下客户端，具体取决于凭据是什么以及它们在 HTTP 请求中的传递方式：

|凭据|客户端|
|--|--|
|通过表单发送用户名/密码|[FormClient](https://github.com/pac4j/pac4j/blob/master/pac4j-http/src/main/java/org/pac4j/http/client/indirect/FormClient.java)（间接客户端）<br/> [DirectFormClient](https://github.com/pac4j/pac4j/blob/master/pac4j-http/src/main/java/org/pac4j/http/client/direct/DirectFormClient.java)（直接客户端）|
|通过基本认证发送用户名/密码|[IndirectBasicAuthClient](https://github.com/pac4j/pac4j/blob/master/pac4j-http/src/main/java/org/pac4j/http/client/indirect/IndirectBasicAuthClient.java)（间接客户端）<br/>[DirectBasicAuthClient](https://github.com/pac4j/pac4j/blob/master/pac4j-http/src/main/java/org/pac4j/http/client/direct/DirectBasicAuthClient.java)（直接客户端）|
|作为 cookie 值发送|[CookieClient](https://github.com/pac4j/pac4j/blob/master/pac4j-http/src/main/java/org/pac4j/http/client/direct/CookieClient.java)（直接客户端）|
|作为 HTTP 头的值发送|[HeaderClient](https://github.com/pac4j/pac4j/blob/master/pac4j-http/src/main/java/org/pac4j/http/client/direct/HeaderClient.java)（直接客户端）|
|作为 Authorization 头的值发送，值以 “Bearer ” 开头|[DirectBearerAuthClient](https://github.com/pac4j/pac4j/blob/master/pac4j-http/src/main/java/org/pac4j/http/client/direct/DirectBearerAuthClient.java)（直接客户端）|
|作为 HTTP 参数值发送|[ParameterClient](https://github.com/pac4j/pac4j/blob/master/pac4j-http/src/main/java/org/pac4j/http/client/direct/ParameterClient.java)（直接客户端）|
|IP 地址|[IpClient](https://github.com/pac4j/pac4j/blob/master/pac4j-http/src/main/java/org/pac4j/http/client/direct/IpClient.java)（直接客户端）|
|X509 证书|[X509Client](https://github.com/pac4j/pac4j/blob/master/pac4j-http/src/main/java/org/pac4j/http/client/direct/IpClient.java)（直接客户端）
|通过摘要认证发送的用户名/令牌|[DirectDigestAuthClient](https://github.com/pac4j/pac4j/blob/master/pac4j-http/src/main/java/org/pac4j/http/client/direct/DirectDigestAuthClient.java)（直接客户端）|

**示例**：

```java
// REST authentication with JWT token passed in the url as the "token" parameter
ParameterClient parameterClient = new ParameterClient("token", new JwtAuthenticator(salt));
parameterClient.setSupportGetRequest(true);
parameterClient.setSupportPostRequest(false);

// if the 'Authorization' header is passed with the 'Basic token' value
HeaderClient client = new HeaderClient("Authorization", "Basic ", (credentials, ctx) -> {
    String token = ((TokenCredentials) credentials).getToken();
    // check the token and create a profile
    if ("goodToken".equals(token)) {
        CommonProfile profile = new CommonProfile();
        profile.setId("myId");
        // save in the credentials to be passed to the default AuthenticatorProfileCreator
        credentials.setUserProfile(profile);
    }
});
```

> [原文链接](https://www.pac4j.org/docs/clients/http.html)
