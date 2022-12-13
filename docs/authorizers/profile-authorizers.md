# 用户配置文件授权器

某些授权器仅适用于用户配置文件：

## 1）角色

要检查用户配置文件上的角色，首先需要使用 [AuthorizationGenerator](/clients.html#_2-计算角色) 计算它们。

- [RequireAnyRoleAuthorizer](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/authorization/authorizer/RequireAnyRoleAuthorizer.java) 检查用户配置文件是否至少具有一个预期角色，或者如果未定义任何角色，则至少有一个角色
- [RequireAllRolesAuthorizer](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/authorization/authorizer/RequireAllRolesAuthorizer.java) 检查用户配置文件是否具有所有预期角色

## 2）授权级别

- [IsAnonymousAuthorizer](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/authorization/authorizer/IsAnonymousAuthorizer.java) 检查用户是否匿名（无 profile 或 `AnonymousProfile`）
- [IsAuthenticatedAuthorizer](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/authorization/authorizer/IsAuthenticatedAuthorizer.java) 检查用户是否具有非 `AnonymousProfile` 的 profile
- [IsFullyAuthenticatedAuthorizer](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/authorization/authorizer/IsFullyAuthenticatedAuthorizer.java) 检查用户是否经过认证，但未记住（`isRemembered` 方法）
- [IsRememberedAuthorizer](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/authorization/authorizer/IsRememberedAuthorizer.java) 检查用户是否经过身份验证且仅被记住（`isRemembered` 方法）

## 3）其他

- [CheckProfileTypeAuthorizer](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/authorization/authorizer/CheckProfileTypeAuthorizer.java) 检查已认证用户的当前 profile 类型
- [RequireAnyAttributeAuthorizer](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/authorization/authorizer/RequireAnyAttributeAuthorizer.java) 检查当前 profile 是否具有合适的属性

> [原文链接](https://www.pac4j.org/docs/authorizers/profile-authorizers.html)
