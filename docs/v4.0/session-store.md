# 会话存储

[WebContext](/v4.0/web-context.html) 与 HTTP 请求和响应相关。

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

[ProfileStorageDecision](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/engine/strategy/ProfileStorageDecision.java) 定义了与配置文件相关的决策，即我们是否必须从中读取并将其保存到 web 会话中。它由 [DefaultSecurityLogic](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/engine/DefaultSecurityLogic.java) 使用：

- 默认情况下，将设置 [DefaultProfileStorageDecision](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/engine/strategy/DefaultProfileStorageDecision.java)，这适用于仅使用间接客户端或直接客户端的 web 应用程序
- 对于同时使用间接和直接客户端以及混合认证的 web 应用程序，应使用 [AlwaysUseSessionProfileStorageDecision](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/engine/strategy/AlwaysUseSessionProfileStorageDecision.java)。

> [原文链接](https://www.pac4j.org/4.0.x/docs/session-store.html)
