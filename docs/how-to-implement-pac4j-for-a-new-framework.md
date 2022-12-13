# 如何为新框架/工具实现 pac4j

*pac4j* 是一个简单而强大的安全引擎。它附带了要在任何框架/工具中实现的相应概念和组件。

## 1）依赖

添加 `pac4j-core` 依赖以从 `pac4j` 的核心 API 或 JEE环境中的 `pac4j-javaee`（弃用）/`pac4j-jakartaee` 依赖中获益。

为了获得特定的支持，还可以添加其他依赖项：用于 OAuth 的 `pac4j-oauth`、用于 CAS 的 `pac4j-cas`、用于 SAML 的 `pac4j-saml` ……

## 2）配置

要定义安全配置，请通过 `Clients` 类收集所有认证机制 = [客户端](/clients.html)（以共享相同的回调 url）。还要定义[授权器](/authorizers.html)以检查授权，并在 `Config` 上聚合两者（客户端和授权器）：

```java
FacebookClient facebookClient = new FacebookClient(FB_KEY, FB_SECRET);
TwitterClient twitterClient = new TwitterClient(TW_KEY, TW_SECRET);
FormClient formClient = new FormClient("http://localhost:8080/theForm.jsp", new SimpleTestUsernamePasswordAuthenticator(), new UsernameProfileCreator());
CasClient casClient = new CasClient();
casClient.setCasLoginUrl("http://mycasserver/login");
Clients clients = new Clients("http://localhost:8080/callback", facebookClient, twitterClient, formClient, casClient);
Config config = new Config(clients);
config.addAuthorizer("admin", new RequireAnyRoleAuthorizer("ROLE_ADMIN"));
config.addAuthorizer("custom", new CustomAuthorizer());
```

你还可以添加**匹配器**来定义是否必须应用安全性。

## 3）“过滤器/控制器”

为了保护Java web应用程序，**参考实现是创建一个过滤器和两个端点**：

- 一个过滤器来**保护 url**
- 一个端点，用于**接收回调**：来自有状态认证进程的（间接客户端）
- 另一个端点**用于执行注销**。

在你的框架中，你需要创建：

1） 实现 [WebContext](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/context/WebContext.java) 接口的特定 `EnvSpecificWebContext`（JEE 环境除外），在 JEE 环境中，你已经可以使用现有的 `JEEContext`。`EnvSpecificWebContext` 应将有关 web 会话管理的调用委托给 [SessionStore](/session-store.html)

2） 实现 [HttpActionAdapter](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/http/adapter/HttpActionAdapter.java) 以在 web 上下文上执行操作的特定 `EnvSpecificHttpActionAdapter`。

### A）保护 URL

[保护 URL 的逻辑](/security-filter.html)由 `SecurityLogic` 接口及其默认实现 [DefaultSecurityLogic](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/engine/DefaultSecurityLogic.java) 定义。

在框架中，必须定义适当的“过滤器”、“拦截器”、“控制器”或用于拦截 HTTP 请求并委托给 `SecurityLogic` 类的任何机制。

**示例：**

- JEE

```java
    @Override
    protected final void internalFilter(final HttpServletRequest request, final HttpServletResponse response,
                                        final FilterChain filterChain) throws IOException, ServletException {

        final Config config = getSharedConfig();

        final SessionStore bestSessionStore = FindBest.sessionStore(null, config, JEESessionStore.INSTANCE);
        final HttpActionAdapter bestAdapter = FindBest.httpActionAdapter(null, config, JEEHttpActionAdapter.INSTANCE);
        final SecurityLogic bestLogic = FindBest.securityLogic(securityLogic, config, DefaultSecurityLogic.INSTANCE);

        final WebContext context = FindBest.webContextFactory(null, config, JEEContextFactory.INSTANCE).newContext(request, response);

        bestLogic.perform(context, bestSessionStore, config, (ctx, session, profiles, parameters) -> {
            // if no profiles are loaded, pac4j is not concerned with this request
            filterChain.doFilter(profiles.isEmpty() ? request : new Pac4JHttpServletRequestWrapper(request, profiles), response);
            return null;
        }, bestAdapter, clients, authorizers, matchers);
    }
```

- Play

```java
    protected CompletionStage<Result> internalCall(final Http.Request req, final PlayWebContext webContext, final String clients, final String authorizers, final String matchers, final boolean multiProfile) throws Throwable {

        final HttpActionAdapter<Result, PlayWebContext> bestAdapter = FindBest.httpActionAdapter(null, config, PlayHttpActionAdapter.INSTANCE);
        final SecurityLogic<CompletionStage<Result>, PlayWebContext> bestLogic = FindBest.securityLogic(securityLogic, config, DefaultSecurityLogic.INSTANCE);


        final HttpActionAdapter<CompletionStage<Result>, PlayWebContext> actionAdapterWrapper = (action, webCtx) -> CompletableFuture.completedFuture(bestAdapter.adapt(action, webCtx));
        return bestLogic.perform(webContext, config, (webCtx, profiles, parameters) -> {
	            // when called from Scala
	            if (delegate == null) {
	                return CompletableFuture.completedFuture(null);
	            } else {
	                return delegate.call(webCtx.supplementRequest(req));
	            }
            }, actionAdapterWrapper, clients, authorizers, matchers, multiProfile);
    }
```

### B）为间接客户端处理回调

[处理回调的逻辑](/callback-endpoint.html)由 `CallbackLogic` 接口及其默认实现 [DefaultCallbackLogic](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/engine/DefaultCallbackLogic.java) 定义。

在框架中，必须定义适当的“控制器”来响应 HTTP 请求，并将调用委托给 `CallbackLogic` 类。

**示例：**

- JEE

```java
    @Override
    protected void internalFilter(final HttpServletRequest request, final HttpServletResponse response,
                                           final FilterChain chain) throws IOException, ServletException {

        final Config config = getSharedConfig();

        final SessionStore bestSessionStore = FindBest.sessionStore(null, config, JEESessionStore.INSTANCE);
        final HttpActionAdapter bestAdapter = FindBest.httpActionAdapter(null, config, JEEHttpActionAdapter.INSTANCE);
        final CallbackLogic bestLogic = FindBest.callbackLogic(callbackLogic, config, DefaultCallbackLogic.INSTANCE);

        final WebContext context = FindBest.webContextFactory(null, config, JEEContextFactory.INSTANCE).newContext(request, response);

        bestLogic.perform(context, bestSessionStore, config, bestAdapter, this.defaultUrl, this.renewSession, this.defaultClient);
    }
```

- Play

```java
    public CompletionStage<Result> callback(final Http.Request request) {

        final HttpActionAdapter<Result, PlayWebContext> bestAdapter = FindBest.httpActionAdapter(null, config, PlayHttpActionAdapter.INSTANCE);
        final CallbackLogic<Result, PlayWebContext> bestLogic = FindBest.callbackLogic(callbackLogic, config, DefaultCallbackLogic.INSTANCE);

        final PlayWebContext playWebContext = new PlayWebContext(request, playSessionStore);
        return CompletableFuture.supplyAsync(() -> bestLogic.perform(playWebContext, config, bestAdapter,
                this.defaultUrl, this.saveInSession, this.multiProfile, this.renewSession, this.defaultClient), ec.current());
    }
```

### C）注销

[执行应用程序/认证提供者注销的逻辑](/logout-endpoint.html)由 `LogoutLogic` 接口及其默认实现 [DefaultLogoutLogic](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/engine/DefaultLogoutLogic.java) 定义。

在你的框架中，必须定义适当的“控制器”来响应 HTTP 请求并将调用委托给 `LogoutLogic` 类。

**示例：**

- JEE

```java
    @Override
    protected void internalFilter(final HttpServletRequest request, final HttpServletResponse response,
                                           final FilterChain chain) throws IOException, ServletException {

        final Config config = getSharedConfig();

        final SessionStore bestSessionStore = FindBest.sessionStore(null, config, JEESessionStore.INSTANCE);
        final HttpActionAdapter bestAdapter = FindBest.httpActionAdapter(null, config, JEEHttpActionAdapter.INSTANCE);
        final LogoutLogic bestLogic = FindBest.logoutLogic(logoutLogic, config, DefaultLogoutLogic.INSTANCE);

        final WebContext context = FindBest.webContextFactory(null, config, JEEContextFactory.INSTANCE).newContext(request, response);

        bestLogic.perform(context, bestSessionStore, config, bestAdapter, this.defaultUrl, this.logoutUrlPattern, this.localLogout, this.destroySession, this.centralLogout);
    }
```

- Play

```java
    public CompletionStage<Result> logout(final Http.Request request) {

        final HttpActionAdapter<Result, PlayWebContext> bestAdapter = FindBest.httpActionAdapter(null, config, PlayHttpActionAdapter.INSTANCE);
        final LogoutLogic<Result, PlayWebContext> bestLogic = FindBest.logoutLogic(logoutLogic, config, DefaultLogoutLogic.INSTANCE);

        final PlayWebContext playWebContext = new PlayWebContext(request, playSessionStore);
        return CompletableFuture.supplyAsync(() -> bestLogic.perform(playWebContext, config, bestAdapter, this.defaultUrl,
                this.logoutUrlPattern, this.localLogout, this.destroySession, this.centralLogout), ec.current());
    }
```

> [原文链接](https://www.pac4j.org/docs/how-to-implement-pac4j-for-a-new-framework.html)
