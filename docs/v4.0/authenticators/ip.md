# IP 地址校验

*pac4j* 允许你验证传入的 IP 地址。

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

## 2）`IpRegexpAuthenticator`

[IpRegexpAuthenticator](https://github.com/pac4j/pac4j/blob/master/pac4j-http/src/main/java/org/pac4j/http/authorization/authorizer/IpRegexpAuthorizer.java)允许你检查给定的 IP 地址是否有效。它通常由 [IpClient](https://github.com/pac4j/pac4j/blob/master/pac4j-http/src/main/java/org/pac4j/http/client/direct/IpClient.java) 定义。

成功验证凭据后，它将“返回” [IpProfile](https://github.com/pac4j/pac4j/blob/master/pac4j-http/src/main/java/org/pac4j/http/profile/IpProfile.java)。

**示例**：

```java
IpClient ipClient = new IpClient(new IpRegexpAuthenticator("10\\..*"));
```

通过 `context.getRemoteAddr()` 方法检索IP地址。不过，在某些基础设施上，IP 地址在 HTTP 标头中可用（如 `X-Forwarded-For` 或 `x-real-ip`）。因此，你可以定义你希望从中检索 IP 地址的 HTTP 头（一个或多个）。你可以设置代理 IP，因此 pac4j 可以在搜索头之前检查请求的远程地址是否来自代理服务器。

**示例**：

```java
IpClient ipClient = new IpClient(new IpRegexpAuthenticator("10\\..*"));

IpExtractor ipHeaderExtractor = new IpExtractor(ipClient.getName());
ipHeaderExtractor.setAlternateIpHeaders("X-Forwarded-For", "x-real-ip");
ipHeaderExtractor.setProxyIp("127.0.0.1");
ipClient.setCredentialsExtractor(ipHeaderExtractor);
```

> [原文链接](https://www.pac4j.org/4.0.x/docs/authenticators/ip.html)
