# LDAP

*pac4j* 允许你验证用户名/密码，并在 LDAP 上创建、更新和删除用户。

## 1）依赖

你需要使用以下模块：`pac4j-ldap`。

**示例（Maven依赖项）**：

```xml
<dependency>
    <groupId>org.pac4j</groupId>
    <artifactId>pac4j-ldap</artifactId>
    <version>${pac4j.version}</version>
</dependency>
```

## 2）`LdapProfileService`

`LdapProfileService` 允许你用于：

- 验证 LDAP 上的用户名/密码（可以将其定义为处理 `UsernamePasswordCredentials` 的HTTP客户端的认证器）
- 在 LDAP 中创建、更新或删除用户。

它与 [LdapProfile](https://github.com/pac4j/pac4j/blob/master/pac4j-ldap/src/main/java/org/pac4j/ldap/profile/LdapProfile.java) 一起工作。

它基于伟大的 [Ldpative](http://www.ldaptive.org/) 库，由一个 `org.ldaptive.ConnectionFactory` 和一个 `org.ldaptive.auth.Authenticator` 构建。

**示例**：

```java
// ldaptive:
FormatDnResolver dnResolver = new FormatDnResolver();
dnResolver.setFormat(LdapServer.CN + "=%s," + LdapServer.BASE_PEOPLE_DN);
ConnectionConfig connectionConfig = new ConnectionConfig();
connectionConfig.setConnectTimeout(500);
connectionConfig.setResponseTimeout(1000);
connectionConfig.setLdapUrl("ldap://localhost:" + LdapServer.PORT);
DefaultConnectionFactory connectionFactory = new DefaultConnectionFactory();
connectionFactory.setConnectionConfig(connectionConfig);
PoolConfig poolConfig = new PoolConfig();
poolConfig.setMinPoolSize(1);
poolConfig.setMaxPoolSize(2);
poolConfig.setValidateOnCheckOut(true);
poolConfig.setValidateOnCheckIn(true);
poolConfig.setValidatePeriodically(false);
SearchValidator searchValidator = new SearchValidator();
IdlePruneStrategy pruneStrategy = new IdlePruneStrategy();
BlockingConnectionPool connectionPool = new BlockingConnectionPool();
connectionPool.setPoolConfig(poolConfig);
connectionPool.setBlockWaitTime(1000);
connectionPool.setValidator(searchValidator);
connectionPool.setPruneStrategy(pruneStrategy);
connectionPool.setConnectionFactory(connectionFactory);
connectionPool.initialize();
PooledConnectionFactory pooledConnectionFactory = new PooledConnectionFactory();
pooledConnectionFactory.setConnectionPool(connectionPool);
PooledBindAuthenticationHandler handler = new PooledBindAuthenticationHandler();
handler.setConnectionFactory(pooledConnectionFactory);
Authenticator ldaptiveAuthenticator = new Authenticator();
ldaptiveAuthenticator.setDnResolver(dnResolver);
ldaptiveAuthenticator.setAuthenticationHandler(handler);
// pac4j:
LdapProfileService ldapProfileService  = new LdapProfileService(connectionFactory, ldaptiveAuthenticator);
```

基本用户 DN 可以通过 `setUsersDn` 方法更改。以及使用 `setIdAttribute`、`setUsernameAttribute` 和 `setPasswordAttribute` 方法设置 id、用户名和密码等 LDAP 属性名称。

可以通过两种方式在 LDAP 中管理用户画像的属性：

- 每个属性都显式映射到一个特定的 LDAP 属性中，并且所有这些属性都通过 `setAttributes` 方法定义为用逗号分隔的名称列表（这是自 1.9 版以来存在的传统模式）
- 或者将整个用户画像序列化并保存在 `serializedprofile` LDAP 属性中。

::: danger 注意
从 3.x 系列中的 v3.9.0、4.x 系列中的 v4.2.0 和 v5.0 开始，`serializedprofile` 是用 JSON 编写的，而不是使用 Java 序列化。
:::

> [原文链接](https://www.pac4j.org/5.7.x/docs/authenticators/ldap.html)
