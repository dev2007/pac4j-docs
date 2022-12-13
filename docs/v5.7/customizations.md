# 自定义设置

*pac4j* 附带了一组满足各种需求的庞大组件，因此在进行任何定制之前，你应该仔细阅读[客户端](/v5.7/clients.html)、[认证器](/v5.7/authenticators.html)和[授权者](/v5.7/authorizers.html)页面，以检查已经提供的内容。

## 1）自定义认证/授权组件：

确保清楚了解不同组件的作用：

- [Client](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/client/Client.java) 是一个完整的登录过程：它对界面是间接的（[IndirectClient](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/client/IndirectClient.java)），对 web服 务是直接的（[DirectClient](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/client/DirectClient.java)）。它重定向到认证提供者（仅限间接客户端），提取用户凭据，验证用户凭据，并为经过认证的用户创建用户配置文件
- [RedirectionActionBuilder](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/redirect/RedirectionActionBuilder.java) 将用户重定向到认证提供者进行登录（间接客户端）
- [CredentialsExtractor](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/credentials/extractor/CredentialsExtractor.java) 从 HTTP 请求（间接和直接客户端）中提取用户凭据
- [Authenticator](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/credentials/authenticator/Authenticator.java) 验证用户凭据（间接和直接客户端）
- [ProfileCreator](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/profile/creator/ProfileCreator.java) 为经过认证的用户（间接和直接客户端）创建用户配置文件
- [Authorizer](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/authorization/authorizer/Authorizer.java) 允许基于用户配置文件或 web 上下文进行访问
- [Matcher](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/matching/Matcher.java) 定义安全性是否必须应用于 web 上下文
- [AuthorizationGenerator](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/authorization/generator/AuthorizationGenerator.java) 为给定的用户配置文件生成适当的角色和权限。

覆盖或创建新组件应该很简单。

然而，构建 `Client` 需要额外的努力。注意：

- 你确实需要了解你希望支持哪种身份验证机制：是针对界面（凭据只提供一次，认证几乎总是在外部认证提供者处进行）还是针对 web 服务（每个请求都会传递凭据）
- 所有客户端都应实现 `IndirectClient` 或 `DirectClient` 基类，并定义适当的 `RedirectionActionBuilder`、`CredentialExtractor`、`Authenticator` 和 `ProfileCreator`（以及可选的 `LogoutActionBuilder`）
- 可能需要创建新的 [Credentials](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/credentials/Credentials.java) 类型（如果它不是由 `TokenCredentials` 设计的简单字符串或由 `UsernamePasswordCredentials` 指定的用户名/密码）。这些新凭据可能继承自受支持协议的基本凭据（如 `OAuthCredentials`）
- 通常，为新客户端创建新的配置文件（无论该配置文件是否具有特定数据）以能够区分所有用户配置文件是一种良好的做法。新的用户配置文件当然应该继承自协议支持的基本配置文件，如 `OAuth20Profile`。至少，它必须继承自 [CommonProfile](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/profile/CommonProfile.java)。认证提供者返回的数据可能需要转换（例如，将单个字符串转换为Java枚举），为此，需要转换器（扩展 [AttributeConverter](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/profile/converter/AttributeConverter.java) 的类）。转换器和返回的用户配置文件类都必须在 [ProfileDefinition](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/profile/definition/ProfileDefinition.java) 中定义。

## 2）改变核心流程：

更改核心流覆盖或创建新组件允许您在常规 *pac4j* web 组件的定义逻辑边界内实现新行为。不过，在某些情况下，这可能还不够。因此，你可以决定中断流程，并通过请求一些额外的操作来更改所提供的行为。这可以通过抛出 [HttpAction](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/exception/http/HttpAction.java)（像任何异常一样）来实现，因为大多数组件都允许这样做。

**示例**：

```java
public class ExampleAuthorizer implements Authorizer {

    @Override
    public boolean isAuthorized(WebContext context, SessionStore sessionStore, List<UserProfile> profiles) {
        if ("specificValue".equals(context.getRequestHeader("specificHeader")))
        {
            throw new FoundAction("/message.html");
        }
        return true;
    }
}
```

## 3）自定义 web 集成：

*pac4j* 实现严重依赖 `WebContext` 和 `SessionStore` 来处理 HTTP 请求、响应和会话。这些组件的默认实现可以被覆盖或替换。

以及默认的 `ProfileManager`（用于保存/恢复配置文件）或 `GuavaStore`（用于在缓存中保存数据）。

在所有情况下，没有什么比以现有组件为例更好的了。不要犹豫，在 [pac4j 开发邮件列表](https://groups.google.com/forum/?fromgroups#!forum/pac4j-dev)中提出任何问题。

> [原文链接](https://www.pac4j.org/5.7.x/docs/customizations.html)
