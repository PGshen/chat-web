/*
 * @Date: 2023-07-27 22:35:12
 * @LastEditors: peng pgs1108pgs@126.com
 * @LastEditTime: 2023-07-29 23:18:42
 * @FilePath: /ai-tool-web/.eslintrc.js
 */
const base = require('eslint-config-standard-ts')

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ['standard', 'plugin:vue/vue3-recommended'],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue'],
    project: 'tsconfig.json'
  },
  rules: {
    ...base.overrides[0].rules,
    '@typescript-eslint/strict-boolean-expressions': 'warn',
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/restrict-plus-operands": "off",
    "@typescript-eslint/consistent-type-assertions": "off",
    "@typescript-eslint/method-signature-style": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    'vue/multi-word-component-names': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 6,
        multiline: 6
      }
    ]
  }
}
