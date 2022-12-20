# 第三方扩展

存在第三方开发的 *pac4j* 的扩展。这些扩展提供了核心 *pac4j* 发行版中没有的功能，这些功能可能对具有特定需求的特定用户集有用。目前，已知以下扩展：

## IDC 扩展

[PAC4J 的 IDC 扩展](https://github.com/jkacer/pac4j-extensions)是 IDC 内部开发的一个项目，以开源形式发布。

它提供以下模块：

- *SAML 客户端数据库配置* —— 此模块允许你使用关系数据库，如 Oracle DB，配置一组 SAML2 客户端。你无需更改 PAC4J 静态配置（例如 Spring XML 文件）即可对应用程序进行配置更改。你只需向数据库表中添加新行或修改现有行，然后重新启动应用程序。你还可以实现重新加载机制，即使不重新启动应用程序也可以进行配置更改。

> [原文链接](https://www.pac4j.org/4.0.x/docs/extensions.html)