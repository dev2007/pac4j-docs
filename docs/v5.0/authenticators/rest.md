# REST API

*pac4j* 允许你通过 REST API 验证用户。

## 1）依赖

你需要使用以下模块：`pac4j-http`。

**示例（Maven依赖项）**：

```xml
<dependency>
    <groupId>org.pac4j</groupId>
    <artifactId>pac4j-http</artifactId>
    <version>${pac4j.version}</version>
</dependency>
```

## 2）`RestAuthenticator`

[RestAuthenticator](https://github.com/pac4j/pac4j/blob/master/pac4j-http/src/main/java/org/pac4j/http/credentials/authenticator/RestAuthenticator.java) 通过将提供的用户名/密码作为基本认证传送到 URL 来验证，该 URL 必须返回：

- 如果用户名/密码凭据有效，则将用户配置文件作为 JSON 的 `200` HTTP 响应
- 如果用户名/密码凭证无效，则使用任何其他 HTTP 状态代码（最好是 `401`）。

如果认证成功，则返回 [RestProfile](https://github.com/pac4j/pac4j/blob/master/pac4j-http/src/main/java/org/pac4j/http/profile/RestProfile.java)。

**正确的服务器响应示例**：

```json
{
  "id": "1234",
  "attributes": {
    "firstName": "Jerome"
  }
}
```

**客户端示例**：

```java
RestAuthenticator authenticator = new RestAuthenticator("http://rest-api-url");
DirectBasicAuthClient directBasicAuthClient = new DirectBasicAuthClient(authenticator);
```

> [原文链接](https://www.pac4j.org/5.0.x/docs/authenticators/rest.html)