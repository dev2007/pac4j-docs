# 用户配置文件

当 *pac4j* 成功认证用户时，将从认证提供者检索其数据，并构建用户配置文件。他的配置文件包括：

- 一个标识符 （`getId()`）
- 属性（`getAttributes()`、 `getAttribute(name)`）
- 认证相关属性 （`getAuthenticationAttributes()`、`getAuthenticationAttribute(name)`）
- 角色 （`getRoles()`）
- 权限 （`getPermissions()`）
- 客户端名称（`getClientName()`）
- 记住我 （`isRemembered()`）
- 一个关联标识符（`getLinkedId()`）

事实上，配置文件层次结构的根类是 [BasicUserProfile](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/profile/BasicUserProfile.java)。它实现 [UserProfile](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/profile/UserProfile.java) 接口。

这适用于需要最小用户配置文件的特定用例。

在 *pac4j* 环境中，必须考虑的第一个用户配置文件是 [CommonProfile](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/profile/CommonProfile.java)，它定义了大多数配置文件中最常用的方法。

用户配置文件通过 [profile 管理器](/v5.6/profile-manager.html)进行管理。

## 1）标识符

每个用户配置文件必须具有唯一标识符。因此，当构建用户配置文件时，*pac4j* 客户端使用一个值作为配置文件标识符，该值强制来自认证提供者的唯一性。

这在同一认证提供者提供的配置文件中运行良好，但在使用多个认证提供者时可能会出现问题。我们可能会在从认证提供者中选择的标识符之间发生冲突。为了避免这个问题，在配置文件标识符之前添加了一个“类型化标识符”来添加配置文件类名。

**示例**：

```java
profile.getId() // 00001
profile.getTypedId() // org.pac4j.oauth.profile.facebook.FacebookProfile#00001
```

由于标识符必须是 `String`，因此可以使用 `ProfileHelper.sanitizeIdentifier` 方法转换其他 Java 类型并删除标识符的“类型化”部分。

## 2）属性

用户配置文件具有从认证提供者检索的数据（转换后）填充的属性。具有相同名称和集合类型值的多个属性可以（可选）合并为一个属性。特别是，它对于在不同的单个元素集合中返回角色的认证提供者非常有用。

## 3）认证相关属性

某些认证提供者将包含与认证本身相关的属性，例如认证方法、认证有效的时间段或认证提供者的元数据。这些属性与用户的属性分开存储。

## 4）角色和权限

可以通过 `addRole(role)`、`addRoles(Roles)`、`addPermission(permission)`和 `addPermissions(permissions)` 方法将角色和权限添加到用户配置文件中。

它们通常在 [AuthorizationGenerator](/v5.6/clients.html#_2-计算角色和权限) 中计算。

## 5）客户端名字

在登录过程中，客户端的名称通过 `setClientName(name)` 方法保存到用户配置文件中，稍后可以通过 `getClientName()` 方法检索。

## 6）记住我

用户配置文件可以定义为记住我，而不是通过 `setRemembered(boolean)` 方法进行完全认证。如果记住了用户配置文件，`isRemembered()` 方法将返回。

## 7） `CommonProfile` 的常用方法

`CommonProfile` 有以下方法：

|方法|类型|返回|
|--|--|--|
|getEmail()|`String`|`email` 属性|
|getFirstName()|`String`|`first_name` 属性|
|getFamilyName()|`String`|`family_name` 属性|
|getDisplayName()|`String`|`display_name` 属性|
|getUsername()|`String`|`username` 属性|
|getGender()|Gender|`gender` 属性|
|getLocale()|`Locale`|`locale` 属性|
|getPictureUrl()|`URI`|`picture_url` 属性|
|getProfileUrl()|`URI`|`profile_url` 属性|
|getLocation()|`String`|`location` 属性|
|asPrincipal()|`Principal`|包含当前认证用户的名字的一个对象|
|isExpired()|`boolean`|如果当前配置文件过期，为 `false`|

## 8）数据定义

配置文件类和属性是通过 [ProfileDefinition](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/profile/definition/ProfileDefinition.java) 实现定义的。

`setProfileFactory` 方法允许你定义要为用户配置文件返回的实例类，而 `primary` 和 `secondary` 方法允许你使用其特定的转换器定义属性。

许多属性转换器已经存在：[BooleanConverter](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/profile/converter/BooleanConverter.java)、[ColorConverter](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/profile/converter/ColorConverter.java) ……请查看 [org.pc4j.core.profile.converter](https://github.com/pac4j/pac4j/tree/master/pac4j-core/src/main/java/org/pac4j/core/profile/converter) 包。

因此，`newProfile` 方法返回一个新的类实例，而 `convertAndAdd` 方法会转换属性（如果有关联的转换器）并将其添加到配置文件中。

如果将 `typedId` 指定为第一个参数，并且已调用 `setRestoreProfileFromTypedId(true)` 方法，则 `newProfile` 方法还可以返回 `typedId` 的相关配置文件。

## 9）数据结构

事实上，大多数客户端都不会返回 `CommonProfile`，但会返回特定的配置文件，如 `FacebookProfile`、`OidcProfile` ……

- （部分）使用特定实现覆盖 `CommonProfile` 的通用方法
- 为其特定属性添加特定的 `getter`。

## 10）关联标识符

每个用户配置文件可能有一个关联标识符，它是另一个用户配置文件的标识符。这样，两个用户配置文件都被关联起来，它允许你通过用户的帐户进行认证，并加载在第一个用户中定义的关联用户，特别是通过使用 [LoadLinkedUserAuthorizationGenerator](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/authorization/generator/LoadLinkedUserAuthorizationGenerator.java)。

> [原文链接](https://www.pac4j.org/5.6.x/docs/user-profile.html)
