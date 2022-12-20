# SAML

*pac4j* 允许你使用 SAML v2.0 协议登录任何 SAML 认证提供者。

它已经与各种 SAML 2 提供者进行了测试：Okta、testshib.org，CAS SAML2 IdP，Shibboleth v3.4 等。

## 1）依赖

你需要使用以下模块：

- 此模块要求 JDK 11 并基于 OpenSAML >= v4 构建。

```java
<dependency>
    <groupId>org.pac4j</groupId>
    <artifactId>pac4j-saml</artifactId>
    <version>${pac4j.version}</version>
</dependency>
```

这是对于大多数部署和配置的推荐选项。

- 此模块要求 JDK 8 并基于 OpenSAML v3 构建。

```xml
<dependency>
    <groupId>org.pac4j</groupId>
    <artifactId>pac4j-saml-opensamlv3</artifactId>
    <version>${pac4j.version}</version>
</dependency>
```

## 2）基本配置

[SAML2Client](https://github.com/pac4j/pac4j/blob/master/pac4j-saml/src/main/java/org/pac4j/saml/client/SAML2Client.java) 必须用于使用 SAML 2 认证提供者登录。

首先，如果你没有密钥库，则需要为所有签名和加密操作生成密钥库（keystore）：

```bash
keytool -genkeypair -alias pac4j-demo -keypass pac4j-demo-passwd -keystore samlKeystore.jks -storepass pac4j-demo-passwd -keyalg RSA -keysize 2048 -validity 3650
```

或者，你也可以让 pac4j 为你创建密钥库。如果密钥库资源不存在且可写，*pac4j* 将尝试生成密钥库并在其中生成相关密钥对。

然后，必须定义 [SAML2Configuration](https://github.com/pac4j/pac4j/blob/master/pac4j-saml/src/main/java/org/pac4j/saml/config/SAML2Configuration.java)：

```java
SAML2Configuration cfg = new SAML2Configuration(new ClassPathResource("samlKeystore.jks"),
        "pac4j-demo-passwd",
        "pac4j-demo-passwd",
        new ClassPathResource("testshib-providers.xml"));
```

第一个参数（`keystoreResource`）是定义为用作 Spring 资源的 keystore：

- `org.springframework.core.io.FileSystemResource` 类用作磁盘文件
- `org.springframework.core.io.ClassPathResource` 类用作 classpath 文件
- `org.springframework.core.io.UrlResource` 类用作 URL

第二个参数（`keywordPassword`）是密钥库生成的 `-storepass` 选项的值，而第三个参数（`privateKeyPassword`）是 `-keypass` 选项值。

第四个参数（`identityProviderMetadataResource`）应该指向 IdP 元数据，假设你可以使用与密钥库相同的定义。

或者，你也可以使用“前缀机制”来定义 `Resource`：

```java
SAML2Configuration cfg = new SAML2Configuration("resource:samlKeystore.jks",
    "pac4j-demo-passwd",
    "pac4j-demo-passwd",
    "resource:testshib-providers.xml");
```

有以下可用的前缀：

- `resource`：或者 `classpath:` 前缀，创建一个 `ClassPathResource` 组件
- `http`：或者 `https:` 前缀，创建一个 `UrlResource` 组件
- `file`：有前缀或没有前缀时，都会创建一个 `FileSystemResource` 组件

或者你甚至可以使用空构造函数和适当的 `setter`：

- `setKeystoreResource`、`setKeystoreResourceFilepath`、`setKeystoreResourceClasspath`、`setKeystoreResourceUrl` 或者 `setKeystorePath` 方法用于定义 keystore
- `setKeystorePassword` 方法用于定义 keystore 密码
- `setPrivateKeyPassword` 方法用于定义 keystore 私有密码
- `setIdentityProviderMetadataResource`、`setIdentityProviderMetadataResourceFilepath`、`setIdentityProviderMetadataResourceClasspath`、`setIdentityProviderMetadataResourceUrl` 或者 `setIdentityProviderMetadataPath` 方法用于定义认证提供者元数据

最后，你需要根据前面的配置声明 `SAML2Client`：

```java
SAML2Client client = new SAML2Client(cfg);
```

成功认证后，返回 [SAML2Profile](https://github.com/pac4j/pac4j/blob/master/pac4j-saml/src/main/java/org/pac4j/saml/profile/SAML2Profile.java)。

`SAML2Client` 配置 `ReplayCache`，以防止重放攻击。此 `ReplayCache` 必须在认证之间保持状态。因此，必须使用 `SAML2Client` 的单个实例。如果这不可能，则可以重写 `initSAMLReplayCache` 方法以创建自定义 `ReplayCacheProvider`。

## 3）扩展配置

你可以控制认证请求的各个方面，例如强制和/或被动认证：

```java
cfg.setForceAuth(true);
cfg.setPassive(true);
```

你可以通过 `setAuthnRequestBindingType` 方法定义认证请求的绑定类型，也可以通过 `setSpLogoutRequestBindingType` 方式定义 SP 注销请求的绑定类别：

```java
cfg.setAuthnRequestBindingType(SAMLConstants.SAML2_REDIRECT_BINDING_URI);
// or cfg.setAuthnRequestBindingType(SAMLConstants.SAML2_POST_BINDING_URI);
// or cfg.setAuthnRequestBindingType(SAMLConstants.SAML2_POST_SIMPLE_SIGN_BINDING_URI);
```

你可以通过 `setResponseBindingType` 方法定义认证响应的绑定类型（默认为 `POST`）：

```java
cfg.setResponseBindingType(SAMLConstants.SAML2_POST_BINDING_URI);
// or cfg.setResponseBindingType(SAMLConstants.SAML2_ARTIFACT_BINDING_URI);
```

请注意，SP 元数据将定义 IdP 注销请求的POST绑定。

一旦你在认证提供者（IdP）上有了认证的 web 会话（session），通常它不会再次提示你输入凭据，并且会自动为你生成新的断言。默认情况下，SAML 客户端将在一小时内接受基于先前认证的断言。如果要更改此行为，请设置 `maximumAuthenticationLifetime`参数：

```java
// lifetime in seconds
client.setMaximumAuthenticationLifetime(600);
```

默认情况下，应用程序（服务提供者，SP）的实体 ID 将等同于[回调 URL](/v4.0/clients.html#_3-回调-URL)。但你可以使用 `serviceProviderEntityId` 参数强制自己的实体 ID：

```java
// custom SP entity ID
cfg.setServiceProviderEntityId("http://localhost:8080/callback?extraParameter");
```

根据 SAML 规范，如果 SP 实体的格式为 `nameid-format:entity`，则认证请求不能包含 `NameQualifier`。然而，一些 IdP 要求提供该信息。你可以通过 `useNameQualifier` 参数在请求中强制使用 `NameQualifier`:

```java
// force NameQualifier in the authn request
cfg.setUseNameQualifier(true);
```

要允许发送到认证提供者的认证请求指定属性消耗索引，请执行以下操作：

```java
cfg.setAttributeConsumingServiceIndex(1);
```

要允许发送到认证提供者的认证请求指定断言消费者服务索引，请执行以下操作：

```java
cfg.setAssertionConsumerServiceIndex(1);
```

这也将指导 *pac4j* 从该索引指示的元数据中选择 ACS URL。

要为初始认证请求配置支持的算法和摘要方法，请通过配置对象指定支持的内容：

```java
cfg.setBlackListedSignatureSigningAlgorithms(...);
cfg.setSignatureAlgorithms(...);
cfg.setSignatureReferenceDigestMethods(...);
cfg.setSignatureCanonicalizationAlgorithm(...);
```

SAML 客户端总是要求直接或通过包含断言的响应对断言进行签名。当需要独立于响应处理断言时，可以使用以下命令直接请求对其进行签名：

```java
cfg.setWantsAssertionsSigned(true);
```

你还可能希望使用以下方式启用认证请求的签名：

```java
cfg.setAuthnRequestSigned(true);
```

最终结果将基于 IdP 元数据和上述配置确定。IdP 元数据的选择将始终有利于 *pac4j* 配置，因此如果你需要完全依赖 *pac4j*，则需要修改元数据。

你有两种方式生成 SP 元数据：

- 要么以编程形式通过 `SAML2Client` ：`String spMetadata = client.getServiceProviderMetadataResolver().getMetadata();`
- 要么定义合适的配置：`cfg.setServiceProviderMetadata(new FileSystemResource("/tmp/sp-metadata.xml"));`

此外，可以使用 Java 的 `ServiceLoader` API 来指定 SAML 配置。为了能被发现，你必须创建一个提供者配置文件：`META-INF/services/org.pac4j.saml.util.ConfigurationManager`。文件的内容是 SPI 实现的完全限定类名：`com.example.impl.MyConfigurationManager`。

### 3.1）元数据和密钥库配置

- 对于服务提供商元数据生成，*pac4j* 提供了以下组件：
  - `SAML2FileSystemMetadataGenerator`：这是在文件系统上生成元数据的默认选项。
  - `SAML2HttpUrlMetadataGenerator`：能够使用响应 `GET`/`POST` 方法的 REST API 解析/获取及存储元数据。这主要使用 OpenSAML 的 `HTTPMetadataResolver` 组件来处理。元数据内容总是由 *pac4j* 生成，然后传递给 API 进行存储。API 只需检索或存储元数据即可。无需其他额外处理/工作。`GET` 操作将返回元数据，`POST` 操作将在请求主体中提供元数据。

- 对于服务提供者密钥库生成，*pac4j* 提供了以下组件：
  - `SAML2FileSystemKeystoreGenerator`：这是在文件系统上生成密钥库的默认选项。
  - `SAML2HttpUrlKeystoreGenerator`：能够使用响应 `GET`/`POST` 方法的 REST API 解析/获取及存储密钥库。元数据内容始终由 *pac4j* 生成，然后作为 base64 编码字符串传递给 API 进行存储。API 只需检索或存储密钥库。当获取中时 *pac4j* 会将其密钥库解码回来，再次构建它并继续处理。`GET` 操作将返回密钥库，`POST` 操作将在请求体中提供密钥库。

请注意这些：

- 实际上，`SAML2HttpUrlMetadataGenerator` 很可能与 `SAML2HttpUrlKeystoreGenerator` 一起使用。然而，考虑到组件分离存在的灵活性，这不是严格必要的。
- 联系 URL 端点是通过 `SAML2HttpClientBuilder` 完成的，它是基于 OpenSAML v4 进行了微调。构造器可以支持基本认证和其他形式的端点访问安全性。

```java
SAML2HttpClientBuilder httpClient = new SAML2HttpClientBuilder();
httpClient.setConnectionTimeout(Duration.ofSeconds(1));
httpClient.setSocketTimeout(Duration.ofSeconds(1));

final SAML2Configuration config = new SAML2Configuration();
config.setHttpClient(httpClient.build());
config.setKeystoreResourceUrl("http://localhost:8081/keystore");
config.setServiceProviderMetadataResource(
    new FileUrlResource(new URL("http://localhost:8081/saml")));

// Other Stuff...

config.init();
return config;
```

### 3.2）认证提供者元数据解析

认证提供者元数据的解析也可以被控制和覆盖，如下所示：

```java
final SAML2MetadataResolver resolver = new CustomIdentityProviderSAML2MetadataResolver();
final SAML2Configuration config = new SAML2Configuration();
config.setIdentityProviderMetadataResolver(resolver);
```

## 4）注销

SAML 支持处理注销请求/响应的 HTTP-POST 和 HTTP 重定向绑定（以及传入注销请求的 SOAP绑定）。

`SAML2Client` 可以参与中央注销并向 IdP 发送注销请求。此请求的绑定由 `spLogoutRequestBindingType` 属性控制，可以使用 `SAML2Configuration` 的 `spLogoutRequestSigned` 属性对请求进行签名。

当调用 IdP 时，SAML *pac4j* 应用程序会在本地删除用户配置文件，并根据 `DefaultLogoutHandler` 销毁 web 会话。你可以通过实现 `LogoutHandler` 接口来使用自己的注销处理程序，并在 SAML 配置中定义它。默认情况下，在 SP 启动注销的最后一步，用户将看到一个空白页面。可以使用 `SAML2Configuration` 的 `postLogoutURL` 属性自定义默认 *pac4j* 行为。

当 IdP 调用时，SAML *pac4j* 应用程序基于注销处理程序也会删除用户配置文件，并返回一个注销响应，该响应具有由 `spLogoutResponseBindingType` 属性（在 `SAML2Configuration` 中）定义的绑定。

## 5）认证属性

此客户端将填充以下认证属性：

- IdP 的 entityID（`getAuthenticationAttribute("issuerId")` 或 `SAML2Profile.getIssuerId()`）
- IdP 的 认证断言方法（`getAuthenticationAttribute("authnContext")` 或 `SAML2Profile.getAuthnContexts()`）
- NotBefore SAML 条件 （`getAuthenticationAttribute("notBefore")` 或 `SAML2Profile.getNotBefore()`）
- NotOnOrAfter SAML 条件 （`getAuthenticationAttribute("notOnOrAfter")` 或 `SAML2Profile.getNotOnOrAfter()`）
- 会话索引

## 6）ADFS 细节

你必须遵循这些规则才能成功使用 Microsoft ADFS 2.0/3.0 进行认证。

### a）最大认证时间

*pac4j* 的默认最长时间设置为 1 小时，而 ADFS 将其设置为 8 小时。因此，ADFS 可能会发送一个断言，该断言在 ADFS 侧仍然有效，但在 *pac4j* 侧被评估为无效。

你可以看到以下错误信息: `org.pac4j.saml.exceptions.SAMLException: Authentication issue instant is too old or in the future`

如何使值相等有两种可能性：

- 在“信任属性”对话框中更改ADFS管理控制台中的值
- 使用 `setMaximumAuthenticationLifetime` 方法更改 *pac4j* 侧的值。

### b）Java 加密扩展（JCE）无限强度管辖权策略文件

您必须将 Java 加密扩展（JCE）无限强度管辖权策略文件（Java Cryptography Extension（JCE）Unlimited Strength Jurisdiction Policy Files）安装到运行 *pac4j* 的 JRE/JDK 中。如果不这样做，你可能会遇到以下错误：

```bash
ERROR [org.opensaml.xml.encryption.Decrypter] - <Error decrypting the encrypted data element>
org.apache.xml.security.encryption.XMLEncryptionException: Illegal key size
ERROR [org.opensaml.xml.encryption.Decrypter] - <Failed to decrypt EncryptedData using either EncryptedData KeyInfoCredentialResolver or EncryptedKeyResolver + EncryptedKey KeyInfoCredentialResolver>
ERROR [org.opensaml.saml2.encryption.Decrypter] - <SAML Decrypter encountered an error decrypting element content>
```

Java 加密扩展（JCE）无限强度管辖权策略文件可以从 Oracle’s Java 下载站点下载。

### c）禁用 `urn:oasis:names:tc:SAML:2.0:nameid-format:entity` 格式的名字限定符

ADFS 3.0 在使用 `urn:oasis:names:tc:SAML:2.0:nameid-format:entity` 时不接受 NameQualifier。因此，`SAML2Configuration` 中的参数 `useNameQualifier` 必须设置为默认值 `false`。

## 与各种 IdP 集成

### SimpleSAMPphp

SimpleSAMLphp 是一个常用的 IdP。要将 PAC4J 与 SimpleSAMLphp 集成，请从以下步骤开始。让我们假设一个标准的 simpleSAMLphp 安装。

#### DemoConfigFactory.java

```java
final SAML2Configuration cfg = new SAML2Configuration("resource:samlKeystore.jks",
 "pac4j-demo-passwd",
 "pac4j-demo-passwd",
 "resource:idp-metadata.xml"); //the id-metadata.xml contains IdP metadata, you will have to create this
 cfg.setMaximumAuthenticationLifetime(3600);
 cfg.setServiceProviderEntityId("test.pac4j"); //the entityId of you client (the SP), you will usualy change this
 cfg.setServiceProviderMetadataPath(new File("sp-metadata.xml").getAbsolutePath()); //the metadata of the SP, no changes required usually
 final SAML2Client saml2Client = new SAML2Client(cfg);
```

#### SimpleSAMLphp 配置

请注意，*pac4j* 需要绑定 `urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST` 用于单点登录和单点登出服务，而 simpleSAMLphp 默认安装情况下仅使用 `urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect`。需要将绑定添加到托管的 **metadata/saml20-idp-hosted.php** 文件：

```php
'SingleSignOnServiceBinding' => array('urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect', 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST'),
'SingleLogoutServiceBinding' => array('urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect', 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST'),
```

还需要将 SP 的 EntityID 注册到文件 **metadata/saml20-sp-remote.php**。

```php
$metadata['test.pac4j'] = array(
 'AssertionConsumerService' => 'http://localhost:8080/callback?client_name=SAML2Client',
...
```

#### 元数据

SimpleSAMLphp 在 `http://idp-domain/simplesamlphp/saml2/idp/metadata.php?output=xhtml` 上暴露了它的 IdP 元数据。你可以在 `<md:EntitiesDescriptor ...` 标签中包装这个文件，以生成 **idp-metadata.xml** 文件。

```xml
<?xml version="1.0"?>
<md:EntitiesDescriptor xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata" xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
    <md:EntityDescriptor entityID="http://idp-domain/simplesamlphp/saml2/idp/metadata.php">
      <md:IDPSSODescriptor protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
        <md:KeyDescriptor use="signing">
          <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
            <ds:X509Data>
              <ds:X509Certificate>MII...</ds:X509Certificate>
            </ds:X509Data>
          </ds:KeyInfo>
        </md:KeyDescriptor>
        <md:KeyDescriptor use="encryption">
          <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
            <ds:X509Data>
              <ds:X509Certificate>MII...</ds:X509Certificate>
            </ds:X509Data>
          </ds:KeyInfo>
        </md:KeyDescriptor>
        <md:SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="http://idp-domain/simplesamlphp/saml2/idp/SingleLogoutService.php"/>
        <md:SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="http://idp-domain/simplesamlphp/saml2/idp/SingleLogoutService.php"/>
        <md:NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:transient</md:NameIDFormat>
        <md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="http://idp-domain/simplesamlphp/saml2/idp/SSOService.php"/>
        <md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="http://idp-domain/simplesamlphp/saml2/idp/SSOService.php"/>
      </md:IDPSSODescriptor>
    </md:EntityDescriptor>
</md:EntitiesDescriptor>
```

## 7）自定义 OpenSAML 启动

在幕后，OpenSAML 使用单一注册表保存其配置（构造器、整理器、解析器等）。虽然 *pac4j* 附带了此配置的默认值（参阅 `org.pac4j.saml.util.configuration$DefaultConfigurationManager`），但开发人员重写此配置可能更有用。

*Pac4j* 使用 Java 服务提供程序查找配置类并启动 OpenSAML 库。它将加载它可以在类路径上找到的 `org.pac4j.saml.util.Configuration` 的所有实现，并使用具有 `javax.annotation.Priority` 值的实现。

要使用自定义配置，必须将具有以下内容的 jar 添加到 classpath 中：

- 实现 `org.pac4j.saml.util.Configuration`。此实现具有 `javax.annotation.Priority` 注解，代表优先级。最小值是最终将使用的配置。默认实现的有效优先级为 `100`。通用提供程序可能应该使用 `50`，而最终用户实现程序应该使用 `1`。例如：

```java
  @Priority(100)
  public static class DefaultConfigurationManager implements ConfigurationManager {
      @Override
      public void configure() {
          XMLObjectProviderRegistry registry;
          synchronized (ConfigurationService.class) {
              registry = ConfigurationService.get(XMLObjectProviderRegistry.class);
              if (registry == null) {
                  registry = new XMLObjectProviderRegistry();
                  ConfigurationService.register(XMLObjectProviderRegistry.class, registry);
              }
          }

          try {
              InitializationService.initialize();
          } catch (final InitializationException e) {
              throw new RuntimeException("Exception initializing OpenSAML", e);
          }

          ParserPool parserPool = initParserPool();
          registry.setParserPool(parserPool);
      }

      private static ParserPool initParserPool() {

          try {
              BasicParserPool parserPool = new BasicParserPool();
              parserPool.setMaxPoolSize(100);
              parserPool.setCoalescing(true);
              parserPool.setIgnoreComments(true);
              parserPool.setNamespaceAware(true);
              parserPool.setExpandEntityReferences(false);
              parserPool.setXincludeAware(false);
              parserPool.setIgnoreElementContentWhitespace(true);

              final Map<String, Object> builderAttributes = new HashMap<String, Object>();
              parserPool.setBuilderAttributes(builderAttributes);

              final Map<String, Boolean> features = new HashMap<>();
              features.put("http://apache.org/xml/features/disallow-doctype-decl", Boolean.TRUE);
              features.put("http://apache.org/xml/features/validation/schema/normalized-value", Boolean.FALSE);
              features.put("http://javax.xml.XMLConstants/feature/secure-processing", Boolean.TRUE);
              features.put("http://xml.org/sax/features/external-general-entities", Boolean.FALSE);
              features.put("http://xml.org/sax/features/external-parameter-entities", Boolean.FALSE);

              parserPool.setBuilderFeatures(features);
              parserPool.initialize();
              return parserPool;
          } catch (final ComponentInitializationException e) {
              throw new RuntimeException("Exception initializing parserPool", e);
          }
      }
  }
  ```

- `/META-INF/services/org.pac4j.saml.util.ConfigurationManager` 文件。此文件应具有 `org.pac4j.saml.util.Configuratio` 实现的完全限定类名。

更多信息，参阅[https://docs.oracle.com/javase/tutorial/ext/basics/spi.html](https://docs.oracle.com/javase/tutorial/ext/basics/spi.html)。

> [原文链接](https://www.pac4j.org/4.0.x/docs/clients/saml.html)
