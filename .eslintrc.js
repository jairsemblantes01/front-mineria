module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'require-jsdoc': 'off',
    'new-cap': 'off',
    'max-len': 'off',
    'comma-dangle': ['error', 'only-multiline'],
    'space-before-function-paren': ['error', 'always'],
    'arrow-parens': ['error', 'as-needed'],
    'no-console': ['warn'],
    semi: ['error', 'never'],
    'no-trailing-spaces': ['error'],
    indent: ['error', 2],
    'dot-notation': [
      'error',
      {
        allowKeywords: true
      }
    ],
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    'no-redeclare': 'off',
    'no-unused-vars': 'off'
  }
}
