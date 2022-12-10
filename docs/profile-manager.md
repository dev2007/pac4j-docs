# Profile 管理器

profile 管理器用于处理用户画像（profile）：它可以用于保存或恢复它。

profile 管理器是从 `WebContext` 和 `SessionStore` 实例化的。

## 1）检索

你可以使用 `getProfile()` 方法只返回一个画像，使用 `getProfile()` 方法检索所有画像。

返回的画像的类型为 `UserProfile`，但至少应将其转换为 `CommonProfile`，以检索所有画像共享的最常见属性，或比如在 Facebook 认证的情况下将其转换成 `FacebookProfile` 等真实类型。

如果你已经知道用户画像的类型，也可以使用 `getProfile(class)`。

```java
CasProfile profile = manager.getProfile(CasProfile.class).get();
```

## 2）自定义 profile 管理器

默认情况下，profile 管理器是 [ProfileMamager](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/profile/ProfileManager.java) 组件。

在一些 *pac4j* 实现中，有特定的 profile 管理器：`UndertowProfileManager`、`ShiroProfileManager` 等。

自定义 profile 管理器可以通过以下工厂实例化：

- `setProfileManagerFactory(final ProfileManagerFactory factory)`

它可以设置在组件级别（如逻辑）或 `Config` 级别。

> [原文链接](https://www.pac4j.org/5.7.x/docs/profile-manager.html)