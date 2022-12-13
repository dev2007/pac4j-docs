# 存储

在某些情况下，需要缓存机制。在 *pac4j* 中，这是由 [Store](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/store/Store.java) 概念定义的。

它有以下方法：

- `get`：从存储中获取一个值
- `set`：向存储中设置一个值
- `remove`：从存储中移除一个值（通过它的键）

它只有一个使用 Guava 的默认实现：[GuavaStore](https://github.com/pac4j/pac4j/blob/master/pac4j-core/src/main/java/org/pac4j/core/store/GuavaStore.java)。但如果需要，你可以提供自己的。

> [原文链接](https://www.pac4j.org/5.7.x/docs/store.html)
