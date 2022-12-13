# 向后兼容性

## 1）版本控制&向后兼容性

从版本 2 开始，*pac4j* 项目采用了 [semver](http://semver.org/) 版本控制，以使事情更清晰。

给定版本 X.Y.Z：

- 当 X 变更时，它是一个有重大变化的主要版本（例如：2.X、3.X 等）
- 当 Y 变更时，它是一个次要版本，没有编译/运行时中断更改（例如，您可以毫无顾虑地从 2.5.2 升级到 2.7.0）
- 当 Z 变更时，它是一个 bug 修复版本，没有编译/运行时中断更改（也没有升级问题）。

通常，*pac4j* 实现也遵循 semver 版本控制。

注意，虽然 `pac4j-*` 模块是向后兼容的，但你应该始终添加与升级的 `pac4j-*` 依赖版本相同的 ​​​`​pac4j-core` 依赖。

## 2）维护

### a）核心项目

目前，只有一个稳定且已发布的 *pac4j* 流在同一时间被维护，它是 **4.x 版本**。

较旧的 *pac4j* 流未得到维护。安全修复程序在前一个流上进行了 6 个月的备份。

### b）实现

“主要”实现是：

- *jee-pac4j*
- *buji-pac4j*
- *spring-webmvc-pac4j*
- *spring-security-pac4j*
- *play-pac4j*
- *CAS*

它们总是升级到最新的 *pac4j* 流。其他实现被认为是“次要的（minor）”，可能不会升级。

::: danger 注意
如果此免费开源维护政策不够，则可以订阅付费的 [LTS](https://www.pac4j.org/commercial-support.html)/[Upgrade](https://www.pac4j.org/commercial-support.html) 计划。
:::

> [原文链接](https://www.pac4j.org/5.6.x/docs/backward-compatibility.html)
