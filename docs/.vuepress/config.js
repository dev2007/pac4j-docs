module.exports = {
  title: 'Pac4j 中文文档',
  description: 'Pac4j 中文文档',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'keywords', content: 'pac4j,pac4j 中文文档,shiro,spring security,oauth,oauth2.0,saml,saml2.0,cas,cas server,oidc,openid connector,openid,jwt,http,gae,kerberos,profile,认证,授权,登录,鉴权,RBAC,permssion,role,sa-token,' }],
    ['script',{src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8380975615223941',crossorigin: 'anonymous'}]
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
      title: 'Pac4j 中文文档 v5.7',
      description: 'pac4j 中文文档 v5.7'
    },
    '/v5.6/': {
      title: 'Pac4j 中文文档 v5.6',
      description: 'pac4j 中文文档 v5.6'
    }
  },
  themeConfig: {
    logo: '/logo.png',
    locales: {
      '/': {
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
          ["/", "PAC4J 介绍"],
          ["/main-concepts-and-components", "主要概念和组件"],
          {
            title: '客户端',
            path: '/clients',
            children: [
              '/clients/oauth',
              '/clients/saml',
              '/clients/cas',
              '/clients/openid-connect',
              '/clients/http'
            ]
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
          ["/v5.6/main-concepts-and-components", "主要概念和组件"],
          {
            title: '客户端',
            path: '/v5.6/clients',
            children: []
          }
        ]
      }
    }
  }
};