# 会话存储

[WebContext](/v4.5/web-context.html) 与 HTTP 请求和响应相关。

为了专门处理会话，它依赖于一个 [SessionStore](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/context/session/SessionStore.java)，它可以通过 `getSessionStore` 方法获得。

它有以下方法：

- `getOrCreateSessionId`：获取或创建会话标识符，并在必要时使用它初始化会话
- `get`：从会话中获取属性
- `set`：设置会话中的属性
- `destroySession`：销毁基础 web 会话
- `getTrackableSession`：将本地会话作为可跟踪对象（用于后台通道注销）
- `buildFromTrackableSession`：从可跟踪会话构建新的会话存储（用于后台通道注销）
- `renewSession`：通过将所有数据复制到新会话来更新本地会话。

例如，`JEEContext` 当前使用依赖 JEE 会话的 [JEESessionStore](https://github.com/pac4j/pac4j/blob/master/pac4j-jakartaee/src/main/java/org/pac4j/jee/context/session/JEESessionStore.java)。在 Play 中，我们有一个特定的基于缓存的 [PlayCacheSessionStore](https://github.com/pac4j/play-pac4j/blob/master/shared/src/main/java/org/pac4j/play/store/PlayCacheSessionStore.java)，在 Knox 中也有一个基于 cookie 的 `KnoxSessionStore`。

> [原文链接](https://www.pac4j.org/4.5.x/docs/session-store.html)
