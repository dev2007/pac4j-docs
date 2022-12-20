# 匹配器

## 1）定义

*pac4j* 提供了一个安全模型和引擎（特定行为）。“安全过滤器”负责保护 url、请求认证和可选的授权。

在某些情况下，你可能希望绕过此“安全过滤器”，这可以使用 **matcher** 参数来完成，该参数通常是匹配器名称的列表。匹配器通常在[安全配置](/v4.0/config.html)中定义。

匹配器还可以用于始终在 URL 上应用一些逻辑，例如添加一些安全头。

## 2）可用匹配器

可以通过实现 [Matcher](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/matching/Matcher.java) 接口来定义匹配器。它只有一个方法：`boolean matches(WebContext context)` 来判断是否必须应用“安全过滤器”。

有一些匹配器可用（但你当然可以自己开发）：

- [PathMatcher](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/matching/matcher/PathMatcher.java) 允许你在安全检查中排除某些路径
- [HeaderMatcher](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/matching/matcher/HeaderMatcher.java) 允许你检查给定的头是否为空或是否与正则表达式匹配
- [HttpMethodMatcher](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/matching/matcher/HttpMethodMatcher.java) 允许你检查 HTTP 请求的方法是否是预期的定义方法之一。

## 3）默认匹配器

在 `​​​​DefaultMatchingChecker` 类（由 `DefaultSecurityLogic` 类使用），以下关键字可自动用于以下匹配器：

- `get`、`post`、`put` 和 `delete` 关键字用于 `HttpMethodMatcher` 的相关配置（如果它们还不存在）
- `hsts` 关键字用于 `StrictTransportSecurityMatcher`
- `nosniff` 关键字用于 `XContentTypeOptionsMatcher`
- `noframe` 关键字用于 `XFrameOptionsMatcher`
- `xssprotection` 关键字用于 `XSSProtectionMatcher`
- `nocache` 关键字用于 `CacheControlMatcher`
- `securityheaders` 关键字作为 `hsts`、`nosniff`、`noframe`、`xssprotection`、`nocache` 的快捷方式
- `csrfToken` 关键字用于 `CsrfTokenGeneratorMatcher`
- `allowAjaxRequests` 关键字用于默认配置的 `CorsMatcher`，其中 `Access-Control-Allow-Origin` 头设置为 `*`。
- `none` 关键字用于完全没有匹配器。

:::danger 注意
由于 *pac4j* v4，如果未定义匹配器，`DefaultMatchingChecker` 将应用 **securityHeaders**、**csrfToken** 配置。
:::

> [原文链接](https://www.pac4j.org/4.0.x/docs/matchers.html)