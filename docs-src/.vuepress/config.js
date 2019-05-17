module.exports = {
  serviceWorker: true,
  // We are taking a slightly different approach from the one in https://vuepress.vuejs.org/guide/deploy.html#github-pages
  // Instead of keeping another branch, we build from /docs-src into /docs, which github pages automatically pick
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
