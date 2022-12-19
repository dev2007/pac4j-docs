# Google App Engine

*pac4j* 允许你使用 Google App Engine UserService 登录。

## 1）依赖

你需要使用以下模块：`pac4j-gae`。

**示例（Maven依赖项）**：

```xml
<dependency>
    <groupId>org.pac4j</groupId>
    <artifactId>pac4j-gae</artifactId>
    <version>${pac4j.version}</version>
</dependency>
```

## 2）`GaeUserServiceClient`

唯一可用的客户端是 [GaeUserServiceClient](https://github.com/pac4j/pac4j/blob/master/pac4j-gae/src/main/java/org/pac4j/gae/client/GaeUserServiceClient.java)，它必须在你的 Google App Engine web 应用程序中使用。

**示例**：

```java
GaeUserServiceClient client = new GaeUserServiceClient();
client.setCallbackUrl("http://localhost:8080/callback");
```

> [原文链接](https://www.pac4j.org/4.5.x/docs/clients/google-app-engine.html)
