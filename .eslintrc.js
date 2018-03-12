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
  }
}
