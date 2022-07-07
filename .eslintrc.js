module.exports = {
  env: {
    node: true
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  plugins: ['react', 'react-native', 'react-hooks', 'import', 'prettier'],
  ignorePatterns: ['**/dist/*'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/no-empty-interface': 1,
    '@typescript-eslint/no-inferrable-types': 0,
    '@typescript-eslint/no-unused-expressions': [
      'error',
      { allowShortCircuit: true, allowTernary: true }
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { ignoreRestSiblings: true }
    ],
    '@typescript-eslint/no-use-before-define': 0,
    'import/newline-after-import': 'error',
    'import/no-duplicates': 2,
    'import/order': [
      1,
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index'
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before'
          },
          {
            pattern: 'react-native',
            group: 'external',
            position: 'before'
          }
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'always'
      }
    ],
    'no-console': 0,
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-unused-expressions': 'off', // note you must disable the base rule as it can report incorrect errors
    'object-shorthand': ['error', 'always'],
    'react/display-name': 0,
    'no-extra-boolean-cast': 0
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/']
      },
      typescript: {
        alwaysTryTypes: true
      }
    }
  }
};
