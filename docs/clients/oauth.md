# OAuth

*pac4j* 允许你使用 OAuth v1.0 和 v2.0 协议认证提供者（identity provider）。

## 1）依赖

你需要使用以下模块：`pac4j-oauth`。

**示例（Maven dependency）**：

```xml
<dependency>
    <groupId>org.pac4j</groupId>
    <artifactId>pac4j-oauth</artifactId>
    <version>${pac4j.version}</version>
</dependency>
```

## 2）可用的客户端

### a）通用客户端

你可以使用 [OAuth10Client](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/client/OAuth10Client.java) 或 [OAuth20Client](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/client/OAuth20Client.java) 客户端登录 OAuth1.0 或 2.0 服务器。

**模拟** `BitbucketClient` **(OAuth v1.0)的示例**：

```java
OAuth10Configuration config = new OAuth10Configuration();
config.setKey("bjEt8BMpLwFDqZUvp6");
config.setSecret("NN6fVXRTcV2qYVejVLZqxBRqHgn3ygD4");
config.setApi(new BitBucketApi());
config.setProfileDefinition(new BitbucketProfileDefinition());
OAuth10Client client = new OAuth10Client();
client.setCallbackUrl(PAC4J_BASE_URL);
client.setConfiguration(config);
```

**模拟** `GithubClient` **(OAuth v2.0)的示例**：

```java
OAuth20Configuration config = new OAuth20Configuration();
config.setApi(GitHubApi.instance());
config.setProfileDefinition(new GitHubProfileDefinition());
config.setScope("user");
config.setKey("62374f5573a89a8f9900");
config.setSecret("01dd26d60447677ceb7399fb4c744f545bb86359");
OAuth20Client client = new OAuth20Client();
client.setConfiguration(config);
client.setCallbackUrl(PAC4J_BASE_URL);
```

对于 OAuth v2.0，你也可以使用 [GenericApi20](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/scribe/builder/api/GenericApi20.java) 或直接使用 `GenericOAuth20Client`。

**示例**：

```java
GenericOAuth20Client client = new GenericOAuth20Client();
Map map = new HashMap();
map.put(AGE, "Integer|age");
map.put(IS_ADMIN, "Boolean|is_admin");
map.put(BG_COLOR, "Color|bg_color");
map.put(GENDER, "Gender|gender");
map.put(BIRTHDAY, "Locale|birthday");
map.put(ID, "Long|id");
map.put(BLOG, "URI|blog");
map.put("name", "name");  //default String
client.setProfileAttrs(map);
```

你需要定义要从用户画像获取的所有属性。你可以只定义属性名称（`name`）或属性名称以及关联的转换器（`Boolean|is_admin`）。
目前，支持以下转换器：`Integer`、`Boolean`、`Color`、`Gender`、`Locale`、`Long`、`URI` 和 `String`（默认）。

### b）特定客户端

默认情况下，已有许多客户端可以用于很多认证提供者登录：

|认证提供者|客户端|用户画像|
|--|--|--|
|[BitBucket](https://bitbucket.org/)|[BitbucketClient](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/client/BitbucketClient.java)|[BitbucketProfile](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/profile/bitbucket/BitbucketProfile.java)|
|[a CAS server using the OAuth protocol](https://apereo.github.io/cas/4.2.x/installation/OAuth-OpenId-Authentication.html)|[CasOAuthWrapperClient](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/client/CasOAuthWrapperClient.java)|[CasOAuthWrapperProfile](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/profile/casoauthwrapper/CasOAuthWrapperProfile.java)|
|[DropBox](https://www.dropbox.com/)|[DropBoxClient](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/client/DropBoxClient.java)|[DropBoxProfile](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/profile/dropbox/DropBoxProfile.java)|
|[Facebook](https://www.facebook.com/)|[FacebookClient](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/client/FacebookClient.java)|[FacebookProfile](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/profile/facebook/FacebookProfile.java)|
|[Foursquare](https://www.foursquare.com/)|[FoursquareClient](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/client/FoursquareClient.java)|[FoursquareProfile](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/profile/foursquare/FoursquareProfile.java)|
|[Github](https://github.com/)|[GitHubClient](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/client/GitHubClient.java)|[GitHubProfile](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/profile/github/GitHubProfile.java)|
|[Google](https://www.google.com/)|[Google2Client](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/client/Google2Client.java)|[Google2Profile](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/profile/google2/Google2Profile.java)|
|[HiOrg-Server](https://info.hiorg-server.de/)|[HiOrgServerClient](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/client/HiOrgServerClient.java)|[HiOrgServerProfile](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/profile/hiorgserver/HiOrgServerProfile.java)|
|[LinkedIn](https://www.linkedin.com/)|[LinkedIn2Client](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/client/LinkedIn2Client.java)|[LinkedIn2Profile](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/profile/linkedin2/LinkedIn2Profile.java)|
|[Odnoklassniki](https://ok.ru/)|[OkClient](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/client/OkClient.java)|[OkProfile](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/profile/ok/OkProfile.java)|
|[Paypal](https://www.paypal.com/)|[PayPalClient](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/client/PayPalClient.java)|[PayPalProfile](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/profile/paypal/PayPalProfile.java)|
|[QQ](https://www.qq.com/)|[QQClient](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/client/QQClient.java)|[QQProfile](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/profile/qq/QQProfile.java)|
|[Strava](https://www.strava.com/)|[StravaClient](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/client/StravaClient.java)|[StravaProfile](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/profile/strava/StravaProfile.java)|
|[Twitter](https://twitter.com/)|[TwitterClient](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/client/TwitterClient.java)|[TwitterProfile](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/profile/twitter/TwitterProfile.java)|
|[Vk](https://vk.com/)|[VkClient](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/client/VkClient.java)|[VkProfile](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/profile/vk/VkProfile.java)|
|[Wechat](https://www.wechat.com/)|[WechatClient](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/client/WechatClient.java)|[WechatProfile](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/profile/wechat/WechatProfile.java)|
|[Weibo](https://www.weibo.com/)|[WeiboClient](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/client/WeiboClient.java)|[WeiboProfile](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/profile/weibo/WeiboProfile.java)|
|[Windows Live](https://login.live.com/)|[WindowsLiveClient](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/client/WindowsLiveClient.java)|[WindowsLiveProfile](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/profile/windowslive/WindowsLiveProfile.java)|
|[Word Press](https://wordpress.com/)|[WordPressClient](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/client/WordPressClient.java)|[WordPressProfile](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/profile/wordpress/WordPressProfile.java)|
|[Yahoo](https://www.yahoo.com/)|[YahooClient](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/client/YahooClient.java)|[YahooProfile](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/profile/yahoo/YahooProfile.java)|
|[Cronofy](https://www.cronofy.com/)|[CronofyClient](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/client/CronofyClient.java)|[CronofyProfile](https://github.com/pac4j/pac4j/blob/master/pac4j-oauth/src/main/java/org/pac4j/oauth/profile/cronofy/CronofyProfile.java)|

**示例**：

```java
FacebookClient facebookClient = new FacebookClient("145278422258960", "be21409ba8f39b5dae2a7de525484da8");
TwitterClient twitterClient = new TwitterClient("CoxUiYwQOSFDReZYdjigBA", "2kAzunH5Btc4gRSaMr7D7MkyoJ5u1VzbOOzE8rBofs");
```

> [原文链接](https://www.pac4j.org/5.7.x/docs/clients/oauth.html)
