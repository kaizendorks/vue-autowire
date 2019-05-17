module.exports = {
  serviceWorker: true,
  // See https://vuepress.vuejs.org/guide/deploy.html#github-pages
  base: '/vue-autowire/',
  dest: './docs',
  title: 'Vue Autowire',
  descriptions: 'Library for auto-wiring Vue components, views, and more',
  themeConfig: {
    repo: 'kaizendorks/vue-autowire',
    docsDir: 'docs-src',
    editLinkText: 'Edit this page on GitHub',
    nav: [
      {
        text: 'Guide',
        link: '/guide/'
      },
    ],
    sidebar: [
      '/installation.md',
      '/',
      {
        title: 'Guide',
        collapsable: false,
        children: [
          '/guide/',
          '/guide/registering-components.md',
          '/guide/registering-views.md',
          '/guide/registering-routes.md',
          '/guide/registering-directives.md',
          '/guide/registering-mixins.md',
        ]
      },
    ]
  }
}
