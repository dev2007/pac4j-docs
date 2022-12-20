# OpenID

*pac4j* 允许你使用 OpenID 协议 v1.0 和 v2.0 登录。

请注意，OpenID 协议使用不多。

## 1）依赖

你需要使用以下模块：`pac4j-openid`。

**示例（Maven 示例）**：

```xml
<dependency>
    <groupId>org.pac4j</groupId>
    <artifactId>pac4j-openid</artifactId>
    <version>${pac4j.version}</version>
</dependency>
```

## 2）`YahooClient`

唯一可用的客户端是 [YahooOpenIdClient](https://github.com/pac4j/pac4j/blob/master/pac4j-openid/src/main/java/org/pac4j/openid/client/YahooOpenIdClient.java)，它允许你登录 Yahoo（使用 OpenID 协议）。

```java
YahooOpenIdClient client = new YahooOpenIdClient();
client.setCallbackUrl("http://localhost:8080/callback");
```

>[原文链接](https://www.pac4j.org/4.0.x/docs/clients/openid.html)
