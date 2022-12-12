# 关系型数据库

*pac4j* 允许你验证用户名/密码，并在 SQL 数据库上创建、更新和删除用户。

## 1）依赖

你需要使用以下组件：`pac4j-sql`。

**示例（Maven依赖项）**：

```xml
<dependency>
    <groupId>org.pac4j</groupId>
    <artifactId>pac4j-sql</artifactId>
    <version>${pac4j.version}</version>
</dependency>
```

## 2）`DbProfileService`

[DbProfileService](https://github.com/pac4j/pac4j/blob/master/pac4j-sql/src/main/java/org/pac4j/sql/profile/service/DbProfileService.java) 允许你用于：

- 验证关系数据库上的用户名/密码（可以为处理 `UsernamePasswordCredentials` 的 HTTP 客户端定义）
- 在数据库中创建、更新或删除用户。

它与 [DbProfile](https://github.com/pac4j/pac4j/blob/master/pac4j-sql/src/main/java/org/pac4j/sql/profile/DbProfile.java) 一同工作。

它从 `javax.sql.DataSource` 中构建。

**示例**：

```java
DataSource dataSource = JdbcConnectionPool.create("jdbc:h2:mem:test", dbuser, dbpwd);
DbProfileService dbProfileService = new DbProfileService(dataSource);
```

必须使用以下脚本创建数据库中的用户表：

```sql
CREATE TABLE users
(
  id varchar(255),
  username varchar(255),
  password varchar(255),
  linkedid varchar(255),
  serializedprofile varchar(10000)
);

ALTER TABLE users
	ADD PRIMARY KEY (id),
	ADD KEY username (username),
	ADD KEY linkedid (linkedid);
```

可以通过 `setUsersTable` 方法更改数据库中表的名称。也可以使用 `setIdAttribute`、`setUsernameAttribute` 和 `setPasswordAttribute` 方法设置 id、用户名和密码列。

可以通过两种方式在数据库中管理用户配置文件的属性：

- 或者每个属性都显式保存在特定列中，并且所有这些列都通过 `setAttributes` 方法定义为用逗号分隔的列名列表（这是自 1.9 版以来存在的传统模式）
- 或者将整个用户配置文件序列化并保存在 `serializedprofile` 列中。

此 `DbProfileService` 支持使用特定的 [PasswordEncoder](/authenticators.html#_2-PasswordEncoder) 对数据库中的密码进行编码。

::: danger 注意
从 3.x 系列中的 v3.9.0、4.x 系列中的 v4.2.0 和 v5.0 开始，`serializedprofile` 是用 JSON 编写的，而不是使用 Java 序列化。
:::

> [原文链接](https://www.pac4j.org/5.7.x/docs/authenticators/sql.html)
