# 安全模块

`pac4j-config` 模块：

```xml
<dependency>
    <groupId>org.pac4j</groupId>
    <artifactId>pac4j-config</artifactId>
    <version>${pac4j.version}</version>
</dependency>
```

收集所有 *pac4j* 设施以定义此 `Config` 对象。目前，只有一个组件允许你从一组属性构建客户端：[PropertiesConfigFactory](https://github.com/pac4j/pac4j/blob/master/pac4j-config/src/main/java/org/pac4j/config/client/PropertiesConfigFactory.java)。

::: danger 注意
注意，在必要时必须显式声明依赖项（如要使用 `SAML`，请使用 `pac4j-saml` 模块，如果要使用 `OAuth`，请使用 `pac4j-oauth` 模块……）
:::

**示例（YAML dropwizard 配置文件）**：

```yml
pac4j:
  callbackUrl: /callback
  clientsProperties:
    facebook.id: 145278422258960
    facebook.secret: be21409ba8f39b5dae2a7de525484da8
    saml.keystorePath: resource:samlKeystore.jks
    saml.keystorePassword: pac4j-demo-passwd
    saml.privateKeyPassword: pac4j-demo-passwd
    saml.identityProviderMetadataPath: resource:metadata-okta.xml
    saml.maximumAuthenticationLifetime: 3600
    saml.serviceProviderEntityId: http://localhost:8080/callback?client_name=SAML2Client
    saml.serviceProviderMetadataPath: sp-metadata.xml
    anonymous: fakevalue
    ldap.type: direct
    ldap.url: ldap://ldap.jumpcloud.com:389
    ldap.useStartTls: false
    ldap.dnFormat: uid=%s,ou=Users,o=58e69adc0914b437324e7632,dc=jumpcloud,dc=com
    ldap.usersDn: ou=Users,o=58e69adc0914b437324e7632,dc=jumpcloud,dc=com
    ldap.principalAttributeId: uid
    ldap.principalAttributes: firstName,lastName
    ldap.enhanceWithEntryResolver: false
    formClient.loginUrl: /login.html
    formClient.authenticator: ldap
```

以下是可用于定义客户端的属性（认证器和密码编码器）：

|可用属性|用途|
|--|--|
|`encoder.spring.type` (`bcrypt`、`noop`、`pbkdf2`、`scrypt` 或 `standard`)、`encoder.spring.bcrypt.length`、`encoder.spring.pbkdf2.secret`、`encoder.spring.pbkdf2.iterations`、`encoder.spring.pbkdf2.hashWidth`、`encoder.spring.scrypt.cpuCost`、`encoder.spring.scrypt.memoryCost`、`encoder.spring.scrypt.parallelization`、`encoder.spring.scrypt.keyLength`、`encoder.spring.scrypt.saltLength` 和 `encoder.spring.standard.secret`|根据提供的属性和命名为 `encoder.spring` 或 `encoder.spring.N` 的属性定义 `SpringPasswordEncoder`|
|`encoder.shiro`（如果不需要特定属性）、`encoder.shiro.generatePublicSalt`、`encoder.shiro.hashAlgorithmName`、`encoder.shiro.hashIterations` 和 `encoder.shiro.privateSalt`|根据提供的属性和命名为 `encoder.shiro` 或 `encoder.shiro.N` 定义 `ShiroPasswordEncoder`|
|`ldap.type`、`ldap.dnFormat`、`ldap.principalAttributes`、`ldap.principalAttributeId`、`ldap.principalAttributePassword`、`ldap.subtreeSearch`、`ldap.usersDn`、`ldap.userFilter`、`ldap.enhanceWithEntryResolver`、`ldap.trustCertificates`、`ldap.keystore`、`ldap.keystorePassword`、`ldap.keystoreType`、`ldap.minPoolSize`、`ldap.maxPoolSize`、`ldap.poolPassivator`、`ldap.validateOnCheckout`、`ldap.validatePeriodically`、`ldap.validatePeriod`、`ldap.failFast`、`ldap.idleTime`、`ldap.prunePeriod`、`ldap.blockWaitTime`、`ldap.url`、`ldap.useStartTls`、`ldap.connectTimeout`、`ldap.providerClass`、`ldap.allowMultipleDns`、`ldap.bindDn`、`ldap.bindCredential`、`ldap.saslRealm`、`ldap.saslMechanism`、`ldap.saslAuthorizationId`、`ldap.saslSecurityStrength` 和 `ldap.saslQualityOfProtection`|基于提供的属性和名为 `ldap` 或 `ldap.N` 的 `LdapAuthenticator`|
|`db.dataSourceClassName`、`db.jdbcUrl`、`db.userAttributes`、`db.userIdAttribute`、`db.usernameAttribute`、`db.userPasswordAttribute`、`db.usersTable`、`db.username`、`db.password`、`db.autoCommit`、`db.connectionTimeout`、`db.idleTimeout`、`db.maxLifetime`、`db.connectionTestQuery`、`db.minimumIdle`、`db.maximumPoolSize`、`db.poolName`、`db.initializationFailTimeout`、`db.isolateInternalQueries`、`db.allowPoolSuspension`、`db.readOnly`、`db.registerMbeans`、`db.catalog`、`db.connectionInitSql`、`db.driverClassName`、`db.transactionIsolation`、`db.validationTimeout`、`db.leakDetectionThreshold`、`db.customParamKey`、`db.customParamValue`、`db.loginTimeout`、`db.dataSourceJndi` 和 `db.passwordEncoder`|根据提供的属性和命名为 `db` 或 `db.N` 的属性定义 `DbAuthenticator`|
|`rest.url`|根据提供的属性和命名的 `rest` 或 `rest.N` 定义 `RestAuthenticator`|
|`anonymous`|要定义 `AnonymousClient`，将忽略该值|
|`directBasicAuth.authenticator`|基于提供的属性定义 `DirectBasicAuthClient`|
|`saml.keystorePassword`、`saml.privateKeyPassword`、`saml.keystorePath`、`saml.identityProviderMetadataPath`、`saml.maximumAuthenticationLifetime`、`saml.serviceProviderEntityId`、`saml.serviceProviderMetadataPath`、`saml.destinationBindingType`、
`saml.keystoreAlias`|根据提供的属性定义 `SAML2Client`|
|`cas.loginUrl`、`cas.protocol`|根据提供的属性定义 `CasClient`|
|`oidc.type`（`google` 或 `azure`）、`oidc.azure.tenant` （用于 AzureAD tenant)、
`oidc.id, oidc.secret`、`oidc.scope`、`oidc.discoveryUri`、`oidc.useNonce`、`oidc.preferredJwsAlgorithm`、`oidc.maxClockSkew`、`oidc.clientAuthenticationMethod`、`oidc.customParamKey1`、`oidc.customParamValue1`、`oidc.customParamKey2`、`oidc.customParamValue2`|根据提供的属性定义 `OpenID connect` 客户端|
|`formClient.authenticator`、`formClient.loginUrl`、`formClient.usernameParametet`、`formClient.passwordParameter`|根据提供的属性定义 `FormClient`|
|`indirectBasicAuth.authenticator`、`indirectBasicAuth.realName`|基于提供的属性定义 `IndirectBasicAuthClient`|
|`facebook.id`、`facebook.secret`、`facebook.scope`、`facebook.field`|根据提供的属性定义 `FacebookClient`|
|`twitter.id`、`twitter.secret`|根据提供的属性定义 `TwitterClient`|
|`github.id`、`github.secret`|根据提供的属性定义 `GitHubClient`|
|`dropbox.id`、`dropbox.secret`|根据提供的属性定义 `DropBoxClient`|
|`windowslive.id`、`windowslive.secret`|根据提供的属性定义 `WindowsLiveClient`|
|`yahoo.id`、`yahoo.secret`|根据提供的属性定义 `YahooClient`|
|`linkedin.id`、`linkedin.secret`、`linkedin.fields`、`linkedin.scope`|根据提供的属性定义 `LinkedIn2Client`|
|`foursquare.id`、`foursquare.secret`|根据提供的属性定义 `FoursquareClient`|
|`google.id`、`google.secret`、`google.scope`|根据提供的属性定义 `Google2Client`|
|`oauth2.id`、`oauth2.secret`、`oauth2.authUrl`、`oauth2.tokenUrl`、`oauth2.profileUrl`、`oauth2.profilePath`、`oauth2.profileId`、`oauth2.scope`、`oauth2.withState`、`oauth2.clientAuthenticationMethod`|根据提供的属性定义 `GenericOAuth20Client`|

注意：

- 你可以通过在属性末尾添加一个数字来定义同一类型的多个客户端：`cas.loginUrl.2`、`oidc.type.5` ……
- `.passwordEncoder` 属性必须设置为已定义在 `PasswordEncoder` 中的名字，比如 `encoder.spring` 或 `encoder.shiro.3`
- `.authenticator` 属性必须设置为已定义在 `Authenticator` 中的名字，比如 `ldap` 或 `db.1` 或隐式值：`testUsernamePassword` 或 `testToken`（用于测试认证器）。

> [原文链接](https://www.pac4j.org/5.6.x/docs/config-module.html)
