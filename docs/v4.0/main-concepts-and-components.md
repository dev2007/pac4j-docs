# 主要概念和组件

1. [客户端（client）](/v4.0/clients.html)代表一种认证机制（流）。它执行登录过程并返回用户 profile。间接客户端用于 UI 身份验证，而直接客户端用于 web 服务认证。
2. [认证器（authenticator）](/v4.0/authenticators.html)是用于 HTTP客户端校验凭据。它是用于校验凭据的 `ProfileService` 子组件，但也处理用户的创建、更新和删除。
3. [授权器（authorizer）](/v4.0/authorizers.html)用于检查已验证用户配置文件或当前 web 上下文上的授权。
4. [匹配器（matcher）](/v4.0/matchers.html)定义安全性是否必须应用于**安全过滤器**或其他 web 处理（例如安全标头）
5. [配置（config）](/v4.0/config.html)通过客户端、授权器和匹配器定义安全配置
6. [用户配置文件（user profile）](/v4.0/user-profile.html)是已验证的用户配置文件。它有一个标识符、属性、角色、权限、“记住我”性质和一个链接标识符
7. [web 上下文（web context）](/v4.0/web-context.html)是特定于 *pac4j* 实现的 HTTP 请求和响应的抽象
8. [会话存储（session store）](/v4.0/session-store.html)是特定于 *pac4j* 实现的 HTTP 会话的抽象
9. “[安全过滤器（security filter）](/v4.0/how-to-implement-pac4j-for-a-new-framework.html#a-保护-url)”（或任何用于拦截 HTTP 请求的机制）根据客户端和授权者配置，通过检查用户是否经过认证以及授权是否有效来保护 URL。如果用户未通过认证，则会对直接客户端执行认证，或对间接客户端启动登录流程。
10. “[回调端点（callback endpoint）](/v4.0/how-to-implement-pac4j-for-a-new-framework.html#b-为间接客户端处理回调)”完成间接客户端的登录流程。
11. “[注销端点（logout endpoint）](/v4.0/how-to-implement-pac4j-for-a-new-framework.html#c-注销)”处理应用程序和/或认证服务器注销

> [原文链接](https://www.pac4j.org/4.0.x/docs/main-concepts-and-components.html)
