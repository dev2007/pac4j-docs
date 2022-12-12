# CouchDB

*pac4j* 允许你验证用户名/密码，并在 CouchDB 数据库上创建、更新和删除用户。

## 1）依赖

你需要使用以下模块：`pac4j-couch`。

**示例（Maven依赖项）**：

```xml
<dependency>
    <groupId>org.pac4j</groupId>
    <artifactId>pac4j-couch</artifactId>
    <version>${pac4j.version}</version>
</dependency>
```

## 2）`CouchProfileService`

[CouchProfileService](https://github.com/pac4j/pac4j/blob/master/pac4j-couch/src/main/java/org/pac4j/couch/profile/service/CouchProfileService.java) 允许你能用于：

- 验证 CouchDB 数据库上的用户名/密码（它可以定义为处理 `UsernamePasswordCredentials` 的 HTTP 客户端的认证器）
- 在 CouchDB 数据库中创建、更新或删除用户。

它与 [CouchProfile](https://github.com/pac4j/pac4j/blob/master/pac4j-couch/src/main/java/org/pac4j/couch/profile/CouchProfile.java) 一同工作。

它从 `org.ektorp.CouchDbConnecto` 构建。

**示例**：

```java
HttpClient httpClient = new StdHttpClient.Builder().url(couchDbUrl).build();
CouchDbInstance dbInstance = new StdCouchDbInstance(httpClient);
CouchDbConnector couchDbConnector = dbInstance.createConnector("users", true);
CouchProfileService couchProfileService = new CouchProfileService(couchDbConnector);
```

数据库名称的选择与 `CouchProfileService` 无关。包含用户的数据库必须包含以下设计文档：

```json
{
	"_id": "_design/pac4j",
	"language": "javascript",
	"views": {
		"by_username": {
			"map": "function(doc) {if (doc.username) emit(doc.username, doc);}"
		},
		"by_linkedid": {
			"map": "function(doc) {if (doc.linkedid) emit(doc.linkedid, doc);}"
		}
	}
}
```

可以使用 `setIdAttribute`、`setUsernameAttribute` 和 `setPasswordAttribute` 方法更改 id、用户名和密码属性名称。默认情况下，id 属性是 CouchDB 的 `_id` 属性。如果更改 `username` 或 `linkedid` 属性，请相应地更改设计文档。你还可以使用 `getObjectMapper()` 和 `setObjectMapper()` 获取/设置用于从 CouchDB 序列化 JSON 数据的 `ObjectMapper`，默认值只是新的 `ObjectMaper()`。

可以通过两种方式在 CouchDB 集合中管理用户配置文件的属性：

- 每个属性都显式保存在特定属性中，并且所有这些属性都通过 `setAttributes` 方法定义为用逗号分隔的名称列表（这是自 1.9 版以来存在的传统模式）
- 或者将整个用户配置文件序列化并保存在 `serializedprofile` 属性中。

::: danger 注意
从 3.x 系列中的 v3.9.0、4.x 系列中的 v4.2.0 和 v5.0 开始，`serializedprofile` 是用 JSON 编写的，而不是使用 Java 序列化。
:::

> [原文链接](https://www.pac4j.org/5.7.x/docs/authenticators/couchdb.html)
