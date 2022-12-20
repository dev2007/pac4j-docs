# MongoDB

*pac4j* 允许你验证用户名/密码，并在 MongoDB 数据库上创建、更新和删除用户。

## 1）依赖

你需要使用以下模块：`pac4j-mongo`。

**示例（Maven依赖项）**：

```xml
<dependency>
    <groupId>org.pac4j</groupId>
    <artifactId>pac4j-mongo</artifactId>
    <version>${pac4j.version}</version>
</dependency>
```

## 2）`MongoProfileService`

[MongoProfileService](https://github.com/pac4j/pac4j/blob/master/pac4j-mongo/src/main/java/org/pac4j/mongo/profile/service/MongoProfileService.java) 取代已弃用的 `MongoAuthenticator`，以：

- 验证 MongoDB 数据库上的用户名/密码（可以将其定义为处理 `UsernamePasswordCredentials` 的 HTTP 客户端的认证器）
- 在 MongoDB 数据库中创建、更新或删除用户。

它与 [MongoProfile](https://github.com/pac4j/pac4j/blob/master/pac4j-mongo/src/main/java/org/pac4j/mongo/profile/MongoProfile.java) 一同工作。

它从 `com.mongodb.MongoClient` 构建。

**示例**：

```java
MongoClient mongoClient = new MongoClient(server, port);
MongoProfileService mongoProfileService = new MongoProfileService(mongoClient);
```

用户在 `users` 集合中的 `users` 数据库中进行管理，但两者都可以通过 `setUsersDatabase(String)` 和 `setUsersCollection(String)` 方法进行更改。以及使用 `setIdAttribute`、`setUsernameAttribute` 和 `setPasswordAttribute` 方法设置 id、用户名和密码属性名称。

- 每个属性都显式保存在特定属性中，并且所有这些属性都通过 `setAttributes` 方法定义为用逗号分隔的名称列表（这是 1.9 版中已经存在的传统模式式）
- 或者将整个用户配置文件序列化并保存在 `serializedprofile` 属性中。

> [原文链接](https://www.pac4j.org/4.0.x/docs/authenticators/mongodb.html)
