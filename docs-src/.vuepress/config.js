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
        text: 'Conventions',
        link: '/conventions/'
      },
    ],
    sidebar: [
      '/',
      '/installation.md',
      {
        title: 'Conventions',
        collapsable: false,
        children: [
          '/conventions/',
          '/conventions/components.md',
          '/conventions/views.md',
          '/conventions/routes.md',
          '/conventions/directives.md',
          '/conventions/mixins.md',
        ]
      },
    ]
  }
}
