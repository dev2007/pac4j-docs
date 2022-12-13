# 数据管理器

数据管理器（profile manager）用于处理用户配置文件：它可以用于保存或恢复它。

数据管理器是从 `WebContext` 和 `SessionStore` 实例化的。

## 1）检索

你可以使用 `getProfile()` 方法只返回一个数据，使用 `getProfile()` 方法检索所有数据。

返回的数据的类型为 `UserProfile`，但至少应将其转换为 `CommonProfile`，以检索所有数据共享的最常见属性，或比如在 Facebook 认证的情况下将其转换成 `FacebookProfile` 等真实类型。

如果你已经知道用户配置文件的类型，也可以使用 `getProfile(class)`。

```java
CasProfile profile = manager.getProfile(CasProfile.class).get();
```

## 2）自定义数据管理器

默认情况下，数据管理器是 [ProfileMamager](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/profile/ProfileManager.java) 组件。

在一些 *pac4j* 实现中，有特定的配置管理器：`UndertowProfileManager`、`ShiroProfileManager` 等。

自定义配置管理器可以通过以下工厂实例化：

- `setProfileManagerFactory(final ProfileManagerFactory factory)`

它可以设置在组件级别（如逻辑）或 `Config` 级别。

> [原文链接](https://www.pac4j.org/docs/profile-manager.html)