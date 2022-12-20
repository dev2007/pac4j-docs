# 授权器

**授权器（Authorizer）** 用于在访问 URL 时检查授权（在“[安全过滤器](/v4.0/security-filter.html)”中）：

- 在经过认证的用户配置文件上：用户是否具有适当的角色？
- 或者在 web 上下文中：你能用那个 HTTP 方法调用这个资源吗？

请注意，`Authorizer` 的这个概念比一般安全领域的含义更广泛。

通常，授权器是在应用程序的[安全配置](/v4.0/config.html)中定义的。

有如下可用的授权器：

- [角色/权限](/v4.0/authorizers/profile-authorizers.html#_1-角色-权限)——[匿名/记住我/（完全）授权](/v4.0/authorizers/profile-authorizers.html#_2-授权级别)——[Profile 类型、属性](/v4.0/authorizers/profile-authorizers.html#_3-其他)
CSRF - IP address, HTTP method

## 默认授权器名称

大多数 *pac4j* 实现使用 *pac4j* 逻辑和授权器，因此使用 [DefaultAuthorizationChecker](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/authorization/checker/DefaultAuthorizationChecker.java) 组件。在这种情况下，以下授权器可通过以下简短关键字自动获得：

- `csrfCheck` 用于 `CsrfAuthorizer` 授权器
- `isAnonymous` 用于 `IsAnonymousAuthorizer` 授权器
- `isAuthenticated` 用于 `IsAuthenticatedAuthorizer` 授权器
- `isFullyAuthenticated` 用于 `IsFullyAuthorizedAuthorizer` 授权器
- `isRemembered` 针对 `IsRememberedAuthorizer` 授权器
- `none` 用于完全没有授权器。

:::danger 注意
从 *pac4j* v4 开始，如果未定义授权器，`DefaultAuthorizationChecker` 将应用 **csrfCheck** 配置。
:::

这些短名称在 [DefaultAuthorizer](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/authorization/authorizer/DefaultAuthorizers.java) 中定义为常量。

## 授权器的组合

你可以创建一个组合（连接或分离）。例如：

```java
final Authorizer<CommonProfile> authorizer = or(
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

> [原文链接](https://www.pac4j.org/4.0.x/docs/authorizers.html)
