# 授权器

**授权器（Authorizer）** 用于在访问 URL 时检查授权（在“[安全过滤器](/v5.0/security-filter.html)”中）：

- 在经过认证的用户配置文件上：用户是否具有适当的角色？
- 或者在 web 上下文中：你能用那个 HTTP 方法调用这个资源吗？

请注意，`Authorizer` 的这个概念比一般安全领域的含义更广泛。

通常，授权器是在应用程序的[安全配置](/v5.0/config.html)中定义的。

有如下可用的授权器：

- [角色/权限](/v5.0/authorizers/profile-authorizers.html#_1-角色-权限)——[匿名/记住我/（完全）授权](/v5.0/authorizers/profile-authorizers.html#_2-授权级别)——[Profile 类型、属性](/v5.0/authorizers/profile-authorizers.html#_3-其他)
CSRF - IP address, HTTP method

## 默认授权器名称

大多数 *pac4j* 实现使用 *pac4j* 逻辑和授权器，因此使用 [DefaultAuthorizationChecker](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/authorization/checker/DefaultAuthorizationChecker.java) 组件。在这种情况下，以下授权器可通过以下简短关键字自动获得：

- `csrfCheck`（用于 `CsrfAuthorizer` 授权器），检查 CSRF 令牌是否已作为 POST 请求中的 `pac4jCsrfToken` 头或参数发送
- `isAnonymous`（用于 `IsAnonymousAuthorizer` 授权器），以确保用户未认证
- `isAuthenticated`（用于 `IsAuthenticatedAuthorizer` 授权器），以确保用户已通过认证（默认情况下不需要，除非你使用匿名客户端）
- `isFullyAuthenticated`（用于 `IsFullyAuthorizedAuthorizer` 授权器），检查用户是否已通过认证但未被记住
- `isRemembered`（针对 `IsRememberedAuthorizer` 授权器）用于记住的用户
- `none` 用于完全没有授权器。

这些短名称在 [DefaultAuthorizer](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/authorization/authorizer/DefaultAuthorizers.java) 中定义为常量。你以同名的自己的授权器重载它们。

## 授权器的组合

你可以创建一个组合（连接或分离）。例如：

```java
final Authorizer authorizer = or(
    and(
        requireAnyRole("profile_role1"),
        requireAnyPermission("profile_permission1")
    ),
    and(
        requireAnyRole("profile_role2"),
        requireAnyPermission("profile_permission2")
    )
);
```

> [原文链接](https://www.pac4j.org/5.0.x/docs/authorizers.html)
