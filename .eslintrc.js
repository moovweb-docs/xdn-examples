module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  parser: 'babel-eslint',
  // 'prettier' avoids conflicts with prettier formatting
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
  },
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      rules: {
        'no-undef': 'off', // already covered by TS

        // Replace JS-rules by TS-rules
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          { vars: 'all', varsIgnorePattern: '^_', args: 'none', ignoreRestSiblings: true },
        ],
        'no-redeclare': 'off',
        '@typescript-eslint/no-redeclare': ['error'],
      },
    },
  ],
  globals: {
    logger: 'readonly',
    fail: 'readonly',
    metrics: 'readonly',
    factory: 'readonly',
    jasmine: 'readonly',
    __NEXT_DATA__: 'readonly',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['**/mocks/**/*'],
}
