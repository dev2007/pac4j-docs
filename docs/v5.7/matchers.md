# 匹配器

## 1）定义

“[安全过滤器](/v5.7/security-filter.html)”负责保护 URL、请求认证和可选的授权。

在某些情况下，你可能希望绕过此“安全过滤器”，这可以使用 **matcher** 参数来完成，该参数通常是匹配器名称的列表。匹配器通常在[安全配置](/v5.7/config.html)中定义。

匹配器还可以用于始终在 URL 上应用一些逻辑，例如添加一些安全头。

## 2）可用匹配器

可以通过实现 [Matcher](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/matching/Matcher.java) 接口来定义匹配器。它只有一个方法：`boolean matches(WebContext context)` 来判断是否必须应用“安全过滤器”。

有一些匹配器可用（但您当然可以开发自己的匹配器）：

- [PathMatcher](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/matching/matcher/PathMatcher.java) 允许你在安全检查中包含/排除某些路径
- [HeaderMatcher](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/matching/matcher/HeaderMatcher.java) 允许你检查给定的头是否为空或是否与正则表达式匹配
- [HttpMethodMatcher](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/matching/matcher/HttpMethodMatcher.java) 允许你检查 HTTP 请求的方法是否是预期的定义方法之一。

## 3）默认匹配器

大多数 *pac4j* 实现使用 *pac4j* 逻辑和匹配器，因此使用 [DefaultMatchingChecker](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/matching/checker/DefaultMatchingChecker.java) 组件。在这种情况下，以下匹配器通过以下简短关键字自动可用：

- `get`、`post`、`put` 和 `delete` 关键字用于 `HttpMethodMatcher` 的相关配置（如果它们还不存在）
- `hsts` 关键字用于 `StrictTransportSecurityMatcher`
- `nosniff` 关键字用于 `XContentTypeOptionsMatcher`
- `noframe` 关键字用于 `XFrameOptionsMatcher`
- `xssprotection` 关键字用于 `XSSProtectionMatcher`
- `nocache` 关键字用于 `CacheControlMatcher`
- `securityheaders` 关键字作为 `hsts`、`nosniff`、`noframe`、`xssprotection`、`nocache` 的快捷方式
- `csrfToken` 关键字用于带有 `DefaultCsrfTokenGenerator` 的 `CsrfTokenGeneratorMatcher`（它生成一个 CSRF 令牌，并将其保存为 `pac4jCsrfToken` 请求属性和 `pac4jFsrfToken` cookie）
- `allowAjaxRequests` 关键字用于默认配置的 `CorsMatcher`，其中 `Access-Control-Allow-Origin` 头设置为 `*`。
- `none` 关键字用于完全没有匹配器。

这些短名称在 [DefaultMatchers](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/matching/matcher/DefaultMatchers.java) 中定义为常量。你可以用同名的自己的匹配器重载它们。

> [原文链接](https://www.pac4j.org/5.7.x/docs/matchers.html)