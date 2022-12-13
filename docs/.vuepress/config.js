module.exports = {
  title: 'Pac4j 中文文档',
  description: 'Pac4j 中文文档',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'keywords', content: 'pac4j,pac4j 中文文档,shiro,spring security,oauth,oauth2.0,saml,saml2.0,cas,cas server,oidc,openid connector,openid,jwt,http,gae,kerberos,profile,认证,授权,登录,鉴权,RBAC,permssion,role,sa-token,' }],
    ['script', { src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8380975615223941', crossorigin: 'anonymous' }]
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
        nav: [
          { text: 'BookHub 首页', link: 'https://www.bookhub.tech' },
          { text: '中文文档', link: 'https://docs.bookhub.tech' },
          { text: '计算机书库', link: 'https://pdf.bookhub.tech' }
        ],
        sidebar: [
          ["/", "PAC4J 介绍"],
          ["/main-concepts-and-components", "1）主要概念和组件"],
          {
            title: '2）认证机制',
            path: '',
            children:[
              {
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
            children:[
              '/authorizers/profile-authorizers',
              '/authorizers/web-authorizers'
            ]
          },
          ['/matchers','4）匹配器'],
          {
            title: '5）安全配置',
            path: '/config',
            children:[
              '/config-module'
            ]
          },
          {
            title: '6）Web  组件',
            path: '/web-components',
            children:[
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
          ['/authentication-flows','11）认证流'],
          ['/customizations','12）自定义'],
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
        nav: [
          { text: 'BookHub 首页', link: 'https://www.bookhub.tech' },
          { text: '中文文档', link: 'https://docs.bookhub.tech' },
          { text: '计算机书库', link: 'https://pdf.bookhub.tech' }
        ],
        sidebar: [
          ["/v5.7/", "PAC4J 介绍"],
          ["/v5.7/main-concepts-and-components", "1）主要概念和组件"],
          {
            title: '2）认证机制',
            path: '',
            children:[
              {
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
            children:[
              '/v5.7/authorizers/profile-authorizers',
              '/v5.7/authorizers/web-authorizers'
            ]
          },
          ['/v5.7/matchers','4）匹配器'],
          {
            title: '5）安全配置',
            path: '/v5.7/config',
            children:[
              '/v5.7/config-module'
            ]
          },
          {
            title: '6）Web  组件',
            path: '/v5.7/web-components',
            children:[
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
          ['/v5.7/authentication-flows','11）认证流'],
          ['/v5.7/customizations','12）自定义'],
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
        nav: [
          { text: 'BookHub 首页', link: 'https://www.bookhub.tech' },
          { text: '中文文档', link: 'https://docs.bookhub.tech' },
          { text: '计算机书库', link: 'https://pdf.bookhub.tech' }
        ],
        sidebar: [
          ["/v5.6/", "PAC4J 介绍"],
          ["/v5.6/main-concepts-and-components", "1）主要概念和组件"],
          {
            title: '2）认证机制',
            path: '',
            children:[
              {
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
            children:[
              '/v5.6/authorizers/profile-authorizers',
              '/v5.6/authorizers/web-authorizers'
            ]
          },
          ['/v5.6/matchers','4）匹配器'],
          {
            title: '5）安全配置',
            path: '/v5.6/config',
            children:[
              '/v5.6/config-module'
            ]
          },
          {
            title: '6）Web  组件',
            path: '/v5.6/web-components',
            children:[
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
          ['/v5.6/authentication-flows','11）认证流'],
          ['/v5.6/customizations','12）自定义'],
          {
            title: '13）JavaDoc',
            path: 'https://www.javadoc.io/doc/org.pac4j/pac4j-core/5.6.1/index.html'
          }
        ]
      }
    }
  }
};