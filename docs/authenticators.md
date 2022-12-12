# 认证器

[HTTP 客户端](/clients/http.html)需要[认证器](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/credentials/authenticator/Authenticator.java)来验证凭据。

此 `Authenticator` 接口只有一个方法：`void validate(Credentials credentials, WebContext context, SessionStore sessionStore)`。

[凭据](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/credentials/Credentials.java)可以有两种：

- 用户名/密码的是 [UsernamePasswordCredentials](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/credentials/UsernamePasswordCredentials.java)
- 令牌或标识符的是 [TokenCredentials](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/credentials/TokenCredentials.java)

[HttpAction](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/exception/http/HttpAction.java) 允许你中断凭据验证并触发特定的 HTTP 操作（如临时重定向）。

你可以为许多身份机制使用各种 `Authenticator`：

- [LDAP](/authenticators/ldap.html)
- [SQL](/authenticators/sql.html)
- [JWT](/authenticators/jwt.html)
- [MongoDB](/authenticators/mongodb.html)
- [CouchDB](/authenticators/couchdb.html)
- [IP address](/authenticators/ip.html)
- [REST API](/authenticators/rest.html)

## 1）处理性能问题

对于直接 HTTP 客户端，每个请求都会传递和验证凭据，这可能会导致性能问题（对底层认证系统的调用过多）。因此，强烈建议使用缓存。

这可以使用 [LocalCachingAuthenticator](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/credentials/authenticator/LocalCachingAuthenticator.java) 类（在 `pac4j` 核心模块中可用）来完成，该类根据提供的凭据缓存生成的用户配置文件，从而可以在认证系统上进行备用凭据验证。

**示例**：

```java
LocalCachingAuthenticator authent = new LocalCachingAuthenticator(new JwtAuthenticator(secret), 10000, 15, TimeUnit.MINUTES);
```

默认情况下，`LocalCachingAuthenticator` 使用 Guava 作为其内部[存储](/store.html)，但你可以通过 `setStore` 方法提供自己的存储。

::: danger 注意
请注意，此 `LocalCachingAuthenticator` 需要额外的 `guava` 依赖。
:::

在某些情况下，你还可以通过：`client.setSaveProfileInSession(true);` 来依赖会话；。

如果是 “noop” 认证器（`Authenticator.ALWAYS_VALIDATE`），只有配置文件创建才重要，则应改用 [LocalCachingProfileCreator](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/profile/creator/LocalCachingProfileCreator)。

## 2）`PasswordEncoder`

关于 IP 地址认证器，不需要密码保护。关于 LDAP 认证器，密码保护由系统本身处理。

但对于 MongoDB 和 SQL 认证器，密码保护必须由 [PasswordEncoder](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/credentials/password/PasswordEncoder.java) 显示处理，它可以将明文密码编码为加密密码，并检查明文密码是否与已编码的密码匹配。

必须通过构造函数或 `setPasswordEncoder(passwordEncoder)` 方法为这两个认证器定义密码编码器。

有三种 `PasswordEncoder` 实现：

- Spring Security Crypto [PasswordEncoder](https://github.com/spring-projects/spring-security/blob/master/crypto/src/main/java/org/springframework/security/crypto/password/PasswordEncoder.java) 的包装器：[SpringSecurityPasswordEncode](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/credentials/password/SpringSecurityPasswordEncoder.java)
- Apache Shiro [PasswordService](https://shiro.apache.org/static/1.4.0/apidocs/org/apache/shiro/authc/credential/PasswordService.html) 的包装器：[ShiroPasswordEncoder](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/credentials/password/ShiroPasswordEncoder.java)
- 一个基于 jBCrypt 库：[JBCryptPasswordEncoder](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/credentials/password/JBCryptPasswordEncoder.java)。

::: danger 注意
请注意，`SpringSecurityPasswordEncoder` 需要额外的 `spring-security-crypto` 依赖，`ShiroPasswordEncode` 需要 `shiro-core` 依赖项，`JBCryptPasswordEncoder` 需要 `jBCrypt` 依赖项。
:::

## 3）`ProfileCreator`

事实上，在 HTTP 客户端中，除了验证凭据（`Authenticator`）的方式之外，还可以定义通过 [ProfileCreator](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/profile/creator/ProfileCreator.java) 创建用户配置文件的方式。

在实践中：

- 所有可用的认证器在验证凭据时创建特定的用户配置文件，并将其保存在当前凭据中
- 默认情况下，所有客户端都配置了 [AuthenticatorProfileCreator](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/profile/creator/AuthenticatorProfileCreator.java)，后者从当前凭据中检索用户配置文件并将其返回。

因此，即使提供特定的 `ProfileCreator` 是可能的，它也可以开箱即用。

> [原文链接](https://www.pac4j.org/5.7.x/docs/authenticators.html)
