# 主要概念和组件

1. [客户端（client）](/clients.html)代表一种认证机制（流）。它执行登录过程并返回用户 profile。间接客户端用于 UI 身份验证，而直接客户端用于 web 服务认证。
2. [认证器（authenticator）](/authenticators.html)是用于验证凭据的**客户端**的子组件。它与处理用户创建、更新和删除的 `ProfileService` 组件相关。
3. [授权者（authorizer）](/authorizers.html)用于检查已验证用户 profile 或当前 web 上下文上的授权。
4. [匹配器（matcher）](/matchers.html)定义安全性是否必须应用于**安全过滤器**或其他 web 处理（例如安全标头）
5. [配置（config）](/config.html)定义了由客户端、授权者和匹配者组成的安全配置
6. [用户 profile](/user-profile.html)是经过身份验证的用户的配置文件。它有一个标识符、属性、角色、权限、“记住我”性质和一个链接标识符（到另一个帐户）
7. [web 上下文（web context）](/web-context.html)是特定于 *pac4j* 实现的 HTTP 请求和响应的抽象
8. [会话存储（session store）](/session-store.html)是特定于 *pac4j* 实现的 HTTP 会话的抽象
9. “[安全过滤器（security filter）](/how-to-implement-pac4j-for-a-new-framework.html#保护-url)”（或任何用于拦截 HTTP 请求的机制）根据客户端和授权者配置，通过检查用户是否经过认证以及授权是否有效来保护 URL。如果用户未通过认证，则会对直接客户端执行认证，或对间接客户端启动登录流程。
10. “[回调端点（callback endpoint）](/how-to-implement-pac4j-for-a-new-framework.html#处理间接客户端回调)”完成间接客户端的登录流程。
11. “[登出端点（logout endpoint）](/how-to-implement-pac4j-for-a-new-framework.html#退出)”处理应用程序和/或身份服务器登出

> [原文链接](https://www.pac4j.org/docs/main-concepts-and-components.html)
