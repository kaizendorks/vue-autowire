module.exports = {
  'component test page': function (browser) {
    browser
      .url('http://localhost:8080/')
      .waitForElementVisible('#app', 1000)

      // navigate to the page
      .url('http://localhost:8080/#/components-test')
      .waitForElementVisible('h1', 1000)
      .assert.containsText('h1', 'ensure components are auto-wired')

      // ensure navbar is rendered
      .assert.elementPresent('nav#nav')

      // ensure autowired sync component is rendered
      .assert.elementPresent('#sync-component')
      .assert.containsText('#sync-component', 'HelloWorld sync component')

      // autowired async component is rendered
      .assert.elementPresent('#async-component')
      .assert.containsText('#async-component', 'an async component')

      // ensure autowired complex async component is rendered
      .assert.elementPresent('#async-complex-component')
      .assert.containsText('#async-complex-component', 'BlogPreview async component')
      .assert.containsText('#async-complex-component', 'local subcomponent of the BlogPreview')

      .end();
  },
};
