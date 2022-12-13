# Web 上下文授权器

一些授权器只能用于 web 上下文。

## 1）CSRF

- [CsrfAuthorizer](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/authorization/authorizer/csrf/CsrfAuthorizer.java) 检查 web 上下文是否具有适当的 CSRF 令牌，以防止 CSRF 攻击。使用 [DefaultCsrfTokenGenerator](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/matching/matcher/csrf/DefaultCsrfTokenGenerator.java) 或 `csrfToken` 匹配器，可以获取 CSRF 令牌并将其作为参数或头发送。`CsrfAuthorizer` 检查请求是否为 `POST`，并具有 CSRF 令牌（在参数或头中找到）

## 2）其他

- [IpRegexpAuthorizer](https://github.com/pac4j/pac4j/blob/master/pac4j-http/src/main/java/org/pac4j/http/authorization/authorizer/IpRegexpAuthorizer.java) 检查传入的 IP 地址
- [CheckHttpMethodAuthorizer](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/authorization/authorizer/CheckHttpMethodAuthorizer.java) 检查请求是否使用适当的 HTTP 方法执行

> [原文链接](https://www.pac4j.org/5.6.x/docs/authorizers/web-authorizers.html)
