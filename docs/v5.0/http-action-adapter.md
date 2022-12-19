# Http 操作适配器

[HttpActionAdapter](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/http/adapter/HttpActionAdapter.java) 是一个抽象，用于 *应用 pac4j* HTTP 操作（=[HttpAction](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/exception/http/HttpAction.java)），这些动作由 HTTP 请求/响应 = [web 上下文](/v5.0/web-context.html) 上的逻辑返回。

它的实现因 *pac4j* 的实现而异。

例如，有用于 JEE 应用程序的 [JEEHttpActionAdapter](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/http/adapter/JEEHttpActionAdapter.java)、用于 Play应用程序的 `PlayHttpActionAdapter` 等。

> [原文链接](https://www.pac4j.org/5.0.x/docs/http-action-adapter.html)
