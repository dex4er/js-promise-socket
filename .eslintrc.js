// npm i -g eslint eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard

module.exports = {
  env: { node: true },
  extends: 'standard',
  globals: {
    And: true,
    After: true,
    Before: true,
    Feature: true,
    Given: true,
    Scenario: true,
    Then: true,
    When: true
  },
  rules: {
    indent: ['error', 2, { flatTernaryExpressions: true, MemberExpression: 0, SwitchCase: 1 }],
    'no-cond-assign': [2, 'except-parens'],
    'no-multi-spaces': ['error', { ignoreEOLComments: true }],
    'one-var-declaration-per-line': 2
  }
}
