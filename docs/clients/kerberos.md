# Kerberos

*pac4j* 允许你使用 Keberos 认证机制（也称为 `SPNEGO` 或 `Microsoft HTTP Negotiate`）登录。

Kerberos 客户端需要定义[认证器](/authenticators.html)来处理凭据校验。最可能的是，你只需要将现有的 `KerberosAuthenticator` 与 `SunJaasKerberosTicketValidator` 一起使用，即可完成 Kerberos 票证验证的所有繁重工作。

## 1）依赖

你需要使用以下模块：`pac4j-kerberos`。

**示例（Maven依赖项）**：

```xml
<dependency>
    <groupId>org.pac4j</groupId>
    <artifactId>pac4j-kerberos</artifactId>
    <version>${pac4j.version}</version>
</dependency>
```

## 2）客户端

你可以使用以下客户端：

|期望行为|客户端|
|--|--|
|**Web 浏览器**（Firefox/Safari/IE）票证验证后，它将用户画像存储在 session 中|[IndirectKerberosClient](https://github.com/pac4j/pac4j/blob/master/pac4j-kerberos/src/main/java/org/pac4j/kerberos/client/indirect/IndirectKerberosClient.java)<br/>（失败时，它发送带有 `WWW-Authenticate:Negotiate` 头的 HTTP 401，要求浏览器提供 Kerberos/SPNEGO 凭据）|
|**无状态的 Web 服务**|[DirectKerberosClient](https://github.com/pac4j/pac4j/blob/master/pac4j-kerberos/src/main/java/org/pac4j/kerberos/client/direct/DirectKerberosClient.java)<br/>凭证可以作为请求的 HTTP 头预先提供：<br/>Authentication: Negotiate SomeBase64EncKerberosTicket <br/>（如果未提供，默认策略是发送带有 `WWW-Authenticate: Negotiate` 头的 HTTP 401，要求远程提供 Kerberos/SPNEGO 凭据）|

**示例**：

```java
import org.pac4j.kerberos.client.direct.DirectKerberosClient;
import org.pac4j.kerberos.client.indirect.IndirectKerberosClient;
import org.pac4j.kerberos.credentials.KerberosCredentials;
import org.pac4j.kerberos.credentials.authenticator.KerberosAuthenticator;
import org.pac4j.kerberos.credentials.authenticator.SunJaasKerberosTicketValidator;
import org.pac4j.kerberos.profile.KerberosProfile;
import org.springframework.core.io.FileSystemResource;

SunJaasKerberosTicketValidator validator = new SunJaasKerberosTicketValidator();
// HTTP/fully-qualified-domain-name@DOMAIN
validator.setServicePrincipal("HTTP/www.mydomain.myrealm.lt@MYREALM.LT");
// the keytab file must contain the keys for the service principal, and should be protected
validator.setKeyTabLocation(new FileSystemResource("/private/security/http-keytab"));
// validator.setDebug(true);

IndirectKerberosClient client = new IndirectKerberosClient(new KerberosAuthenticator(validator));
client.setCallbackUrl("/force-kerberos-login"); // required only for indirect client
```

## 3）Kerberos 的常见注意事项（在 JVM 中）

一些常见问题或事项：

- 确保 `keytab` 文件包含服务主体，并且名称完全匹配
  - 对于 web，HTTP 或前缀是必填的，必须大写
- 这里可能需要 Oracle Java（JDK/Java SE等）
  - 大多数加密机制都需要下载 Java Cryptography Extension (JCE) Unlimited Strength Jurisdiction Policy File，并将其复制到 Java 安装的适当目录中。
- 浏览器 URL 必须与 `setServicePrincipal` 中指定的完全限定域名匹配
  - 客户端需要运行 `kinit`
  - 注：为了在本地开发时测试您的应用程序，可以在 `/etc/hosts` 中添加指向 localhost 的假域名：

  ```bash
  127.0.0.1 www.mydomain.myrealm.lt
  ```

> [原文链接](https://www.pac4j.org/5.7.x/docs/clients/kerberos.html)
