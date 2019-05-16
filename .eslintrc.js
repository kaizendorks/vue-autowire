module.exports = {
  root: true,
  extends: [
    'plugin:vue-libs/recommended'
  ],
  rules: {
    'indent': [1, 2],  // warnings-only, 2-space indents.
    'semi': [2, 'always'],
    'quotes': [1, 'single',  { 'allowTemplateLiterals': true }]
  }
};
