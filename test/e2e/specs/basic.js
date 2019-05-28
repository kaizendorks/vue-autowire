module.exports = {
  'test site using vue-autowire starts': function (browser) {
    browser
      .url('http://localhost:8080/')
      .waitForElementVisible('#app', 1000)
      .assert.containsText('h1', 'Vue-Autowire example site')
      .end();
  }
};
