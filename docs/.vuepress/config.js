module.exports = {
  title: 'Pac4j 中文文档',
  description: 'Pac4j 中文文档',
  head: [
    ['link', {
      rel: 'icon',
      href: '/favicon.ico'
    }],
    ['meta', {
      name: 'keywords',
      content: 'pac4j,pac4j 中文文档,shiro,spring security,oauth,oauth2.0,saml,saml2.0,cas,cas server,oidc,openid connector,openid,jwt,http,gae,kerberos,profile,认证,授权,登录,鉴权,RBAC,permssion,role,sa-token,'
    }],
    ['script', {
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8380975615223941',
      crossorigin: 'anonymous'
    }]
  ],
  base: '/',
  markdown: {
    lineNumbers: true
  },
  plugins: [
    [
      '@vuepress/google-analytics', {
        'ga': ''
      }
    ],
    [
      '@renovamen/vuepress-plugin-baidu-tongji', {
        'ba': ''
      }
    ]
  ],
  locales: {
    '/': {
      title: 'Pac4j 中文文档 v6.0（JDK 17）',
      description: 'Pac4j 中文文档 v6.0（JDK 17）'
    },
    '/v5.7/': {
      title: 'Pac4j 中文文档 v5.7（JDK 11）',
      description: 'pac4j 中文文档 v5.7（JDK 11）'
    },
    '/v5.6/': {
      title: 'Pac4j 中文文档 v5.6（JDK 11）',
      description: 'pac4j 中文文档 v5.6（JDK 11）'
    },
    '/v5.0/': {
      title: 'Pac4j 中文文档 v5.0（JDK 11）',
      description: 'pac4j 中文文档 v5.0（JDK 11）'
    },
    '/v4.5/': {
      title: 'Pac4j 中文文档 v4.5（JDK 8）',
      description: 'pac4j 中文文档 v4.5（JDK 8）'
    },
    '/v4.0/': {
      title: 'Pac4j 中文文档 v4.0（JDK 8）',
      description: 'pac4j 中文文档 v4.0（JDK 8）'
    }
  },
  themeConfig: {
    logo: '/logo.png',
    locales: {
      '/': {
        selectText: '选择版本',
        label: 'v6.0',
        ariaLabel: 'v6.0',
        algolia: {},
        nav: [{
            text: 'BookHub 首页',
            link: 'https://www.bookhub.tech'
          },
          {
            text: '中文文档',
            link: 'https://docs.bookhub.tech'
          },
          {
            text: '计算机书库',
            link: 'https://pdf.bookhub.tech'
          }
        ],
        sidebar: [
          ["/", "PAC4J 介绍"],
          {
            title: '1）主要概念和组件',
            path: '/main-concepts-and-components',
            children: [
              '/how-to-implement-pac4j-for-a-new-framework'
            ]
          },
          {
            title: '2）认证机制',
            path: '',
            children: [{
                title: '客户端',
                path: '/clients',
                children: [
                  '/clients/oauth',
                  '/clients/saml',
                  '/clients/cas',
                  '/clients/openid-connect',
                  '/clients/http',
                  '/clients/google-app-engine',
                  '/clients/kerberos'
                ]
              },
              {
                title: '认证器',
                path: '/authenticators',
                children: [
                  '/authenticators/ldap',
                  ['/authenticators/sql', 'SQL'],
                  '/authenticators/jwt',
                  '/authenticators/mongodb',
                  '/authenticators/couchdb',
                  '/authenticators/ip',
                  '/authenticators/rest',
                ]
              }
            ]
          },
          {
            title: '3）授权机制：授权器',
            path: '/authorizers',
            children: [
              '/authorizers/profile-authorizers',
              '/authorizers/web-authorizers'
            ]
          },
          ['/matchers', '4）匹配器'],
          {
            title: '5）安全配置',
            path: '/config',
            children: [
              '/config-module'
            ]
          },
          {
            title: '6）Web  组件',
            path: '/web-components',
            children: [
              '/security-filter',
              '/callback-endpoint',
              '/logout-endpoint'
            ]
          },
          {
            title: '7）用户配置文件',
            path: '/user-profile',
            children: [
              '/profile-manager'
            ]
          },
          {
            title: '8）Web 上下文',
            path: '/web-context',
            children: [
              '/http-action-adapter'
            ]
          },
          {
            title: '9）会话存储',
            path: '/session-store',
            children: [
              '/store'
            ]
          },
          {
            title: '10）发行说明',
            path: '/release-notes',
            children: [
              '/backward-compatibility'
            ]
          },
          ['/authentication-flows', '11）认证流'],
          ['/customizations', '12）自定义'],
          {
            title: '13）JavaDoc',
            path: 'https://www.javadoc.io/doc/org.pac4j/pac4j-core/5.7.0/index.html'
          }
        ]
      },
      '/v5.7/': {
        selectText: '选择版本',
        label: 'v5.7',
        ariaLabel: 'v5.7',
        algolia: {},
        nav: [{
            text: 'BookHub 首页',
            link: 'https://www.bookhub.tech'
          },
          {
            text: '中文文档',
            link: 'https://docs.bookhub.tech'
          },
          {
            text: '计算机书库',
            link: 'https://pdf.bookhub.tech'
          }
        ],
        sidebar: [
          ["/v5.7/", "PAC4J 介绍"],
          {
            title: '1）主要概念和组件',
            path: '/v5.7/main-concepts-and-components',
            children: [
              '/v5.7/how-to-implement-pac4j-for-a-new-framework'
            ]
          },
          {
            title: '2）认证机制',
            path: '',
            children: [{
                title: '客户端',
                path: '/v5.7/clients',
                children: [
                  '/v5.7/clients/oauth',
                  '/v5.7/clients/saml',
                  '/v5.7/clients/cas',
                  '/v5.7/clients/openid-connect',
                  '/v5.7/clients/http',
                  '/v5.7/clients/google-app-engine',
                  '/v5.7/clients/kerberos'
                ]
              },
              {
                title: '认证器',
                path: '/v5.7/authenticators',
                children: [
                  '/v5.7/authenticators/ldap',
                  ['/v5.7/authenticators/sql', 'SQL'],
                  '/v5.7/authenticators/jwt',
                  '/v5.7/authenticators/mongodb',
                  '/v5.7/authenticators/couchdb',
                  '/v5.7/authenticators/ip',
                  '/v5.7/authenticators/rest',
                ]
              }
            ]
          },
          {
            title: '3）授权机制：授权器',
            path: '/v5.7/authorizers',
            children: [
              '/v5.7/authorizers/profile-authorizers',
              '/v5.7/authorizers/web-authorizers'
            ]
          },
          ['/v5.7/matchers', '4）匹配器'],
          {
            title: '5）安全配置',
            path: '/v5.7/config',
            children: [
              '/v5.7/config-module'
            ]
          },
          {
            title: '6）Web  组件',
            path: '/v5.7/web-components',
            children: [
              '/v5.7/security-filter',
              '/v5.7/callback-endpoint',
              '/v5.7/logout-endpoint'
            ]
          },
          {
            title: '7）用户配置文件',
            path: '/v5.7/user-profile',
            children: [
              '/v5.7/profile-manager'
            ]
          },
          {
            title: '8）Web 上下文',
            path: '/v5.7/web-context',
            children: [
              '/v5.7/http-action-adapter'
            ]
          },
          {
            title: '9）会话存储',
            path: '/v5.7/session-store',
            children: [
              '/v5.7/store'
            ]
          },
          {
            title: '10）发行说明',
            path: '/v5.7/release-notes',
            children: [
              '/v5.7/backward-compatibility'
            ]
          },
          ['/v5.7/authentication-flows', '11）认证流'],
          ['/v5.7/customizations', '12）自定义'],
          {
            title: '13）JavaDoc',
            path: 'https://www.javadoc.io/doc/org.pac4j/pac4j-core/5.7.0/index.html'
          }
        ]
      },
      '/v5.6/': {
        selectText: '选择版本',
        label: 'v5.6',
        ariaLabel: 'v5.6',
        algolia: {},
        nav: [{
            text: 'BookHub 首页',
            link: 'https://www.bookhub.tech'
          },
          {
            text: '中文文档',
            link: 'https://docs.bookhub.tech'
          },
          {
            text: '计算机书库',
            link: 'https://pdf.bookhub.tech'
          }
        ],
        sidebar: [
          ["/v5.6/", "PAC4J 介绍"],
          {
            title: '1）主要概念和组件',
            path: '/v5.6/main-concepts-and-components',
            children: [
              '/v5.6/how-to-implement-pac4j-for-a-new-framework'
            ]
          },
          {
            title: '2）认证机制',
            path: '',
            children: [{
                title: '客户端',
                path: '/v5.6/clients',
                children: [
                  '/v5.6/clients/oauth',
                  '/v5.6/clients/saml',
                  '/v5.6/clients/cas',
                  '/v5.6/clients/openid-connect',
                  '/v5.6/clients/http',
                  '/v5.6/clients/google-app-engine',
                  '/v5.6/clients/kerberos'
                ]
              },
              {
                title: '认证器',
                path: '/v5.6/authenticators',
                children: [
                  '/v5.6/authenticators/ldap',
                  ['/v5.6/authenticators/sql', 'SQL'],
                  '/v5.6/authenticators/jwt',
                  '/v5.6/authenticators/mongodb',
                  '/v5.6/authenticators/couchdb',
                  '/v5.6/authenticators/ip',
                  '/v5.6/authenticators/rest',
                ]
              }
            ]
          },
          {
            title: '3）授权机制：授权器',
            path: '/v5.6/authorizers',
            children: [
              '/v5.6/authorizers/profile-authorizers',
              '/v5.6/authorizers/web-authorizers'
            ]
          },
          ['/v5.6/matchers', '4）匹配器'],
          {
            title: '5）安全配置',
            path: '/v5.6/config',
            children: [
              '/v5.6/config-module'
            ]
          },
          {
            title: '6）Web  组件',
            path: '/v5.6/web-components',
            children: [
              '/v5.6/security-filter',
              '/v5.6/callback-endpoint',
              '/v5.6/logout-endpoint'
            ]
          },
          {
            title: '7）用户配置文件',
            path: '/v5.6/user-profile',
            children: [
              '/v5.6/profile-manager'
            ]
          },
          {
            title: '8）Web 上下文',
            path: '/v5.6/web-context',
            children: [
              '/v5.6/http-action-adapter'
            ]
          },
          {
            title: '9）会话存储',
            path: '/v5.6/session-store',
            children: [
              '/v5.6/store'
            ]
          },
          {
            title: '10）发行说明',
            path: '/v5.6/release-notes',
            children: [
              '/v5.6/backward-compatibility'
            ]
          },
          ['/v5.6/authentication-flows', '11）认证流'],
          ['/v5.6/customizations', '12）自定义'],
          {
            title: '13）JavaDoc',
            path: 'https://www.javadoc.io/doc/org.pac4j/pac4j-core/5.6.1/index.html'
          }
        ]
      },
      '/v5.0/': {
        selectText: '选择版本',
        label: 'v5.0',
        ariaLabel: 'v5.0',
        algolia: {},
        nav: [{
            text: 'BookHub 首页',
            link: 'https://www.bookhub.tech'
          },
          {
            text: '中文文档',
            link: 'https://docs.bookhub.tech'
          },
          {
            text: '计算机书库',
            link: 'https://pdf.bookhub.tech'
          }
        ],
        sidebar: [
          ["/v5.0/", "PAC4J 介绍"],
          {
            title: '1）主要概念和组件',
            path: '/v5.0/main-concepts-and-components',
            children: [
              '/v5.0/how-to-implement-pac4j-for-a-new-framework'
            ]
          },
          {
            title: '2）认证机制',
            path: '',
            children: [{
                title: '客户端',
                path: '/v5.0/clients',
                children: [
                  '/v5.0/clients/oauth',
                  '/v5.0/clients/saml',
                  '/v5.0/clients/cas',
                  '/v5.0/clients/openid-connect',
                  '/v5.0/clients/http',
                  '/v5.0/clients/google-app-engine',
                  '/v5.0/clients/kerberos'
                ]
              },
              {
                title: '认证器',
                path: '/v5.0/authenticators',
                children: [
                  '/v5.0/authenticators/ldap',
                  ['/v5.0/authenticators/sql', 'SQL'],
                  '/v5.0/authenticators/jwt',
                  '/v5.0/authenticators/mongodb',
                  '/v5.0/authenticators/couchdb',
                  '/v5.0/authenticators/ip',
                  '/v5.0/authenticators/rest',
                ]
              }
            ]
          },
          {
            title: '3）授权机制：授权器',
            path: '/v5.0/authorizers',
            children: [
              '/v5.0/authorizers/profile-authorizers',
              '/v5.0/authorizers/web-authorizers'
            ]
          },
          ['/v5.0/matchers', '4）匹配器'],
          {
            title: '5）安全配置',
            path: '/v5.0/config',
            children: [
              '/v5.0/config-module'
            ]
          },
          {
            title: '6）Web  组件',
            path: '/v5.0/web-components',
            children: [
              '/v5.0/security-filter',
              '/v5.0/callback-endpoint',
              '/v5.0/logout-endpoint'
            ]
          },
          {
            title: '7）用户配置文件',
            path: '/v5.0/user-profile',
            children: [
              '/v5.0/profile-manager'
            ]
          },
          {
            title: '8）Web 上下文',
            path: '/v5.0/web-context',
            children: [
              '/v5.0/http-action-adapter'
            ]
          },
          {
            title: '9）会话存储',
            path: '/v5.0/session-store',
            children: [
              '/v5.0/store'
            ]
          },
          {
            title: '10）发行说明',
            path: '/v5.0/release-notes',
            children: [
              '/v5.0/backward-compatibility'
            ]
          },
          ['/v5.0/authentication-flows', '11）认证流'],
          ['/v5.0/customizations', '12）自定义'],
          {
            title: '13）JavaDoc',
            path: 'https://www.javadoc.io/doc/org.pac4j/pac4j-core/5.0.1/index.html'
          }
        ]
      },
      '/v4.5/': {
        selectText: '选择版本',
        label: 'v4.5',
        ariaLabel: 'v4.5',
        algolia: {},
        nav: [{
            text: 'BookHub 首页',
            link: 'https://www.bookhub.tech'
          },
          {
            text: '中文文档',
            link: 'https://docs.bookhub.tech'
          },
          {
            text: '计算机书库',
            link: 'https://pdf.bookhub.tech'
          }
        ],
        sidebar: [
          ["/v4.5/", "PAC4J 介绍"],
          {
            title: '1）主要概念和组件',
            path: '/v4.5/main-concepts-and-components',
            children: [
              '/v4.5/how-to-implement-pac4j-for-a-new-framework'
            ]
          },
          {
            title: '2）认证机制',
            path: '',
            children: [{
                title: '客户端',
                path: '/v4.5/clients',
                children: [
                  '/v4.5/clients/oauth',
                  '/v4.5/clients/saml',
                  '/v4.5/clients/cas',
                  '/v4.5/clients/openid-connect',
                  '/v4.5/clients/http',
                  '/v4.5/clients/openid',
                  '/v4.5/clients/google-app-engine',
                  '/v4.5/clients/kerberos'
                ]
              },
              {
                title: '认证器',
                path: '/v4.5/authenticators',
                children: [
                  '/v4.5/authenticators/ldap',
                  ['/v4.5/authenticators/sql', 'SQL'],
                  '/v4.5/authenticators/jwt',
                  '/v4.5/authenticators/mongodb',
                  '/v4.5/authenticators/couchdb',
                  '/v4.5/authenticators/ip',
                  '/v4.5/authenticators/rest',
                ]
              }
            ]
          },
          {
            title: '3）授权机制：授权器',
            path: '/v4.5/authorizers',
            children: [
              '/v4.5/authorizers/profile-authorizers',
              '/v4.5/authorizers/web-authorizers'
            ]
          },
          ['/v4.5/matchers', '4）匹配器'],
          ['/v4.5/config','5）安全配置'],
          {
            title: '6）Web  组件',
            path: '',
            children: [
              '/v4.5/security-filter',
              '/v4.5/callback-endpoint',
              '/v4.5/logout-endpoint'
            ]
          },
          {
            title: '7）用户配置文件',
            path: '/v4.5/user-profile',
            children: [
              '/v4.5/profile-manager'
            ]
          },
          {
            title: '8）会话存储',
            path: '/v4.5/session-store',
            children: [
              '/v4.5/store'
            ]
          },
          {
            title: '9）发行说明',
            path: '/v4.5/release-notes',
            children: [
              '/v4.5/backward-compatibility'
            ]
          },
          ['/v4.5/authentication-flows', '10）认证流'],
          ['/v4.5/customizations', '11）自定义设置'],
          ['/v4.5/extensions', '12）第三方扩展'],
          {
            title: '13）JavaDoc',
            path: 'https://www.javadoc.io/doc/org.pac4j/pac4j-core/4.3.0/index.html'
          }
        ]
      },
      '/v4.0/': {
        selectText: '选择版本',
        label: 'v4.0',
        ariaLabel: 'v4.0',
        algolia: {},
        nav: [{
            text: 'BookHub 首页',
            link: 'https://www.bookhub.tech'
          },
          {
            text: '中文文档',
            link: 'https://docs.bookhub.tech'
          },
          {
            text: '计算机书库',
            link: 'https://pdf.bookhub.tech'
          }
        ],
        sidebar: [
          ["/v4.0/", "PAC4J 介绍"],
          {
            title: '1）主要概念和组件',
            path: '/v4.0/main-concepts-and-components',
            children: [
              '/v4.0/how-to-implement-pac4j-for-a-new-framework'
            ]
          },
          {
            title: '2）认证机制',
            path: '',
            children: [{
                title: '客户端',
                path: '/v4.0/clients',
                children: [
                  '/v4.0/clients/oauth',
                  '/v4.0/clients/saml',
                  '/v4.0/clients/cas',
                  '/v4.0/clients/openid-connect',
                  '/v4.0/clients/http',
                  '/v4.0/clients/openid',
                  '/v4.0/clients/google-app-engine',
                  '/v4.0/clients/kerberos'
                ]
              },
              {
                title: '认证器',
                path: '/v4.0/authenticators',
                children: [
                  '/v4.0/authenticators/ldap',
                  ['/v4.0/authenticators/sql', 'SQL'],
                  '/v4.0/authenticators/jwt',
                  '/v4.0/authenticators/mongodb',
                  '/v4.0/authenticators/couchdb',
                  '/v4.0/authenticators/ip',
                  '/v4.0/authenticators/rest',
                ]
              }
            ]
          },
          {
            title: '3）授权机制：授权器',
            path: '/v4.0/authorizers',
            children: [
              '/v4.0/authorizers/profile-authorizers',
              '/v4.0/authorizers/web-authorizers'
            ]
          },
          ['/v4.0/matchers', '4）匹配器'],
          ['/v4.0/config','5）安全配置'],
          {
            title: '6）用户配置文件',
            path: '/v4.0/user-profile'
          },
          {
            title: '7）会话存储',
            path: '/v4.0/session-store',
            children: [
              '/v4.0/store'
            ]
          },
          {
            title: '8）发行说明',
            path: '/v4.0/release-notes',
            children: [
              '/v4.0/backward-compatibility'
            ]
          },
          {
            title: '9）认证流',
            path: '/v4.0/authentication-flows',
            children:[
              '/v4.0/big-picture'
            ]
          },
          ['/v4.0/customizations', '10）自定义设置'],
          ['/v4.0/extensions', '11）第三方扩展'],
          {
            title: '12）JavaDoc',
            path: 'https://www.javadoc.io/doc/org.pac4j/pac4j-core/4.0.3/index.html'
          }
        ]
      }
    }
  }
};