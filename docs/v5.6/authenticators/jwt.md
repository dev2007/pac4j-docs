# JWT

*pac4j* 允许你验证 JSON web 令牌。

JWT 支持基于出色的 [Nimbus JOSE JWT](http://connect2id.com/products/nimbus-jose-jwt) 库，你应该考虑阅读[算法选择指南](http://connect2id.com/products/nimbus-jose-jwt/algorithm-selection-guide)。

## 1）依赖

你需要使用以下模块：`pac4j-jwt`。

**示例（Maven依赖项）**：

```xml
<dependency>
    <groupId>org.pac4j</groupId>
    <artifactId>pac4j-jwt</artifactId>
    <version>${pac4j.version}</version>
</dependency>
```

## 2）`JwtAuthenticator`

[JwtAuthenticator](https://github.com/pac4j/pac4j/blob/master/pac4j-jwt/src/main/java/org/pac4j/jwt/credentials/authenticator/JwtAuthenticator.java) 验证 [JwtGenerator](https://github.com/pac4j/pac4j/blob/master/pac4j-jwt/src/main/java/org/pac4j/jwt/profile/JwtGenerator.java) 或其他系统生成的 JWT 令牌。

它可以处理 `TokenCredentials`，能为 HTTP 客户端定义。

它支持纯文本、签名和/或加密 JWT 令牌。

在所有情况下，`JwtAuthenticator` 都要求 JWT 具有主题（子声明），除非你定义了 `identifierGenerator`（类型为 `ValueGenerator`）以生成标识符。否则将抛出异常。

如果所提供的 JWT 具有到期日期，则 `JwtAuthenticator` 还可以配置为仅接受通过日期约束的 JWT，该标准通过 `JwtAuthenticator#setExpirationTime()` 与 JWT 到期日期进行比较。

::: danger 注意
注意，出于安全原因，只有在未定义签名配置的情况下，才会接受纯文本 JWT 令牌。如果定义了一个或多个签名配置，则预期将相应地对 JWT 令牌进行签名。
:::

### a）签名

要处理已签名的 JWT，必须使用 `addSignatureConfiguration` 方法定义一个或多个 [SignatureConfiguration](https://github.com/pac4j/pac4j/blob/master/pac4j-jwt/src/main/java/org/pac4j/jwt/config/signature/SignatureConfiguration.java)。

有三种签名配置可供选择：使用密钥（`SecretSignatureConfiguration`）、使用 RSA 密钥对（`RSASignatureConfiguration`）或使用椭圆曲线密钥对（`ECSignatureConfiguration`）。

要验证已签名的 JWT，将成功尝试定义的签名配置（如果 JWT 的算法与签名配置支持的算法匹配）。

### b）加密

要处理加密的 JWT，必须使用 `addEncryptionConfiguration` 方法定义一个或多个 [EncryptionConfiguration](https://github.com/pac4j/pac4j/blob/master/pac4j-jwt/src/main/java/org/pac4j/jwt/config/encryption/EncryptionConfiguration.java)。

与签名配置一样，有三种加密配置可用：使用密钥（`SecretEncryptionConfiguration`）、使用 RSA 密钥对（`RSAEncryptionConfiguration`）或使用椭圆曲线密钥对（`ECEncryptionConfiguration`）。

要解密加密的 JWT，将成功尝试定义的加密配置（如果 JWT 的算法与加密配置支持的算法匹配）。

**示例**：

```java
JwtAuthenticator jwtAuthenticator = new JwtAuthenticator();

# define two signature configurations (one based on the KEY2 secret and the other one based on a generated RSA key pair)
jwtAuthenticator.addSignatureConfiguration(new SecretSignatureConfiguration(KEY2));
KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
KeyPair rsaKeyPair = keyGen.generateKeyPair();
jwtAuthenticator.addSignatureConfiguration(new RSASignatureConfiguration(rsaKeyPair));

# define two encryption configurations (one based on the SECRET secret and the other one based on a generated elliptic curve key pair)
jwtAuthenticator.addEncryptionConfiguration(new SecretEncryptionConfiguration(SECRET));
KeyPairGenerator keyGen = KeyPairGenerator.getInstance("EC");
KeyPair ecKeyPair = keyGen.generateKeyPair();
ECEncryptionConfiguration encConfig = new ECEncryptionConfiguration(ecKeyPair);
encConfig.setAlgorithm(JWEAlgorithm.ECDH_ES_A128KW);
encConfig.setMethod(EncryptionMethod.A192CBC_HS384);
jwtAuthenticator.addEncryptionConfiguration(encConfig);

jwtAuthenticator.validate(new TokenCredentials(token, "myclient"));
```

`JwtAuthenticator` 还提供两种方便的方法来处理 JWT：

- `CommonProfile validateToken(final String token)` 校验令牌并直接返回一个 *pac4j* 用户配置文件。
- `Map<String, Object> validateTokenAndGetClaims(final String token)` 校验令牌并直接返回一组声明/属性，该方法与 *pac4j* 配置文件完全无关。

## c）用户配置文件

- 如果所提供的 JWT 是使用 `JwtGenerator` 从 *pac4j* profile（例如 `FacebookProfile`）生成的，`JwtAuthenticator` 将重新创建相同的 profile
- 如果所提供的 JWT 是用任何其他方式创建的，`JwtAuthenticator` 将创建 `JwtProfile`。

## 3）`JwtGenerator`

要生成纯文本、签名和/或加密 JWT，可以使用 `SignatureConfiguration` 或/和 `EncryptionConfiguration` 定义的 `JwtGenerator`。

**示例**：

```java
JwtGenerator generator = new JwtGenerator(new SecretSignatureConfiguration(SECRET), new SecretEncryptionConfiguration(SECRET));
String token = generator.generate(facebookProfile);
```

JWT 也可以使用指定的到期时间生成：

```java
generator.setExpirationTime(new Date());
```

## 4）JWK

如果你的配置是 JSON JWK，则可以使用 [JWKHelper](https://github.com/pac4j/pac4j/tree/master/pac4j-jwt/src/main/java/org/pac4j/jwt/util/JWKHelper.java) 的方法：

- 使用 `buildSecretFromJwk` 方法从 JSON 中检索密钥
- 使用 `buildRSAKeyPairFromJwk` 方法从 JSON 生成 RSA 密钥
- 使用 `buildECKeyPairFromJwk` 方法从 JSON 构建椭圆曲线密钥。

然后，你将能够构建适当的签名或加密配置。

> [原文链接](https://www.pac4j.org/5.6.x/docs/authenticators/jwt.html)
