# 向后兼容性

## 1）版本控制&向后兼容性

从版本 2 开始，*pac4j* 项目采用了 [semver](http://semver.org/) 版本控制，以使事情更清晰。

给定版本 X.Y.Z：

- 当 X 变更时，它是一个有重大变化的主要版本（例如：2.X、3.X 等）
- 当 Y 变更时，它是一个次要版本，没有编译/运行时中断更改（例如，您可以毫无顾虑地从 2.5.2 升级到 2.7.0）
- 当 Z 变更时，它是一个 bug 修复版本，没有编译/运行时中断更改（也没有升级问题）。

通常，*pac4j* 实现也遵循 semver 版本控制。

注意，虽然 `pac4j-*` 模块是向后兼容的，但你应该始终在与升级的 `pac4j-*` 依赖相同的版本中添加 `pac4j-javaee`、`pac4j-jakartaee` 或`pac4j-core` 依赖。

## 2）维护

### a）核心项目

社区努力集中在最新的流（**master** 分支）上。

对于较旧的流，可能会接受贡献，并且可能会反向移植错误/安全修复。

### b）实现

“主要”实现是：

- *jee-pac4j*
- *buji-pac4j*
- *spring-webmvc-pac4j*
- *spring-security-pac4j*
- *play-pac4j*
- *CAS*

它们应该升级到最新的 *pac4j* 流。

::: danger 注意
如果此免费开源维护政策不够，请联系[商业支持](https://www.pac4j.org/commercial-support.html)。
:::

> [原文链接](https://www.pac4j.org/docs/backward-compatibility.html)
