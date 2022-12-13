# Web 组件

*pac4j* 实现必须基于 *pac4j* 逻辑实现必要的 web 组件：

- 基于 `SecurityLogic` 保护 URL 的[安全过滤器](/v5.6/security-filter.html)
- [回调端点](/v5.6/callback-endpoint.html)用于完成 web 应用程序中 `IndirectClient` 的登录过程。基于 `CallbackLogic`
- 基于 `LogoutLogic` 处理本地和中央注销的[注销端点](/v5.6/logout-endpoint.html)

参阅[如何为新框架/工具实现 *pac4j*](/v5.6/how-to-implement-pac4j-for-a-new-framework.html)，以获取更多技术细节。

> [原文链接](https://www.pac4j.org/5.6.x/docs/web-components.html)
