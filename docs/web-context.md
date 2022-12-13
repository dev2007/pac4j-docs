# Web 上下文

## 1）`WebContext`

[WebContext](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/context/WebContext.java) 是处理任何框架的 HTTP 请求和响应的抽象。

它用于处理：

- 通过检索参数、属性、头、方法、远程地址、服务器名称、服务器端口、服务器体系、路径、协议、cookie、完整 URL、内容来发送 HTTP 请求
- 通过设置内容类型、头和 cookie 来控制 HTTP 响应。

它的实现因 *pac4j* 的实现而异。

例如，JEE 应用程序有 [JEEContext](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/context/JEEContext.java)，Play 应用程序有 `PlayWebContext` 等。

## 2）`WebContextFactory`

对于给定的 framework/*pac4j* 实现，通常会反复实例化相同类型的 web 上下文。不过，当你想要实例化另一个 `WebContext` 时，也存在一些边缘情况。

这由 [WebContextFactory](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/context/WebContextFactory.java) 控制。

与 `WebContext` 一样，它的实现也因 *pac4j* 的实现而不同。

例如，有一个 `JEEContextFactory.INSTANCE` 为 JEE 应用程序实例化 `JEEContext`。

> [原文链接](https://www.pac4j.org/docs/web-context.html)
