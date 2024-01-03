module.exports = {
  env: {
    es2020: true,
    browser: true,
    node: true,
    jest: true,
    mocha: true,
  },
  extends: [
    'canonical',

    // 'canonical/mocha',
    'canonical/jest',
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
  ],
  rules: {
    'unicorn/no-for-loop': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'eslintsort-keys-fix/sort-keys-fix': 'off',
    'array-bracket-newline': 'off',
    'array-element-newline': 'off',
    'canonical/import-specifier-newline': 'off',
    'canonical/destructuring-property-newline': 'off',
    'unicorn/prefer-object-from-entries': 'off',
    'mocha/no-skipped-tests': 'off',
    'jest/consistent-test-it': 'off',
    'mocha/no-global-tests': 'off',
    'jest/require-top-level-describe': 'off',
    'unicorn/no-array-for-each': 'off',
    'canonical/id-match': 'off',
    'canonical/filename-match-exported': 'off',
    'canonical/filename-match-regex': 'off',
    'unicorn/no-array-reduce': 'off',
    'canonical/sort-keys': 'off',
    'max-len': [
      'error',
      140,
      {
        ignorePattern: '^import|^export',
      },
    ],
    'linebreak-style': 0,
    'lines-between-class-members': [
      0,
    ],

    'sort-keys-fix/sort-keys-fix': 'off',
    'object-curly-newline': [
      0,
    ],
    'unicorn/numeric-separators-style': [
      0,
    ],
    '@typescript-eslint/explicit-module-boundary-types': [
      0,
    ],
    'jest/prefer-expect-assertions': [
      0,
    ],

    // Enable this rules later
    'jsdoc/check-tag-names': [
      0,
    ],
    'react/jsx-sort-props': [
      0,
    ],

    // 'lines-around-comment': [0],
    'react/forbid-component-props': [
      0,
    ],
    'import/no-unresolved': [
      0,
    ],
    'import/exports-last': [
      0,
    ],
    'func-style': [
      0,
    ],
    'id-match': [
      0,
    ],
    'filenames/match-regex': [
      0,
    ],

    // 'react-hooks/rules-of-hooks': [0],
    'unicorn/prevent-abbreviations': [
      0,
    ],
    'no-extra-parens': [
      0,
    ],
    'react/no-array-index-key': [
      0,
    ],
    'filenames/match-exported': [
      0,
    ],
    'no-nested-ternary': [
      0,
    ],
    'react/jsx-no-bind': [
      0,
    ],
    'no-inline-comments': [
      0,
    ],
    'line-comment-position': [
      0,
    ],
    'object-property-newline': [
      0,
    ],
    'id-length': [
      0,
    ],
    'function-paren-newline': [
      0,
    ],
    'promise/catch-or-return': [
      0,
    ],
    'promise/always-return': [
      0,
    ],
    'consistent-return': [
      0,
    ],
    'no-unused-vars': [
      0,
    ],
    'require-await': [
      0,
    ],
    'import/max-dependencies': [
      0,
    ],
    'class-methods-use-this': [
      0,
    ],
    '@typescript-eslint/no-unused-vars': [
      0,
    ],
    'jest/no-disabled-tests': [
      0,
    ],
    'mocha/no-top-level-hooks': [
      0,
    ],
    'mocha/no-hooks-for-single-case': [
      0,
    ],
    'fp/no-delete': [
      0,
    ],
    'jest/no-truthy-falsy': [
      0,
    ],
    'react/no-multi-comp': [
      0,
    ],
    'no-shadow': [
      0,
    ],
    'max-nested-callbacks': [
      0,
    ],
    'no-useless-constructor': [
      0,
    ],
    '@typescript-eslint/no-use-before-define': [
      0,
    ],
    'unicorn/consistent-function-scoping': [
      0,
    ],
    complexity: [
      0,
    ],
    'promise/prefer-await-to-then': [
      0,
    ],
    'no-warning-comments': [
      0,
    ],
    'import/unambiguous': [
      0,
    ],
    'mocha/no-setup-in-describe': [
      0,
    ],
    'no-process-exit': [
      0,
    ],
    'no-spaced-func': [
      0,
    ],
    'func-call-spacing': [
      0,
    ],
    'mocha/max-top-level-suites': [
      0,
    ],
    'import/order': [
      0,
    ],
    'no-process-env': [
      0,
    ],
    'import/no-unassigned-import': [
      0,
    ],
    'import/no-namespace': [
      0,
    ],
    'implicit-arrow-linebreak': [
      0,
    ],
    'arrow-body-style': [
      0,
    ],
    'fp/no-class': [
      0,
    ],
    'fp/no-this': [
      0,
    ],
    'space-before-function-paren': [
      0,
    ],
    'arrow-parens': [
      0,
    ],
    'react/prop-types': [
      0,
    ],
    'react/display-name': [
      0,
    ],
    '@typescript-eslint/no-explicit-any': [
      0,
    ],
    '@typescript-eslint/explicit-function-return-type': [
      0,
    ],
    '@typescript-eslint/interface-name-prefix': [
      0,
    ],
    '@typescript-eslint/no-empty-interface': [
      0,
    ],
    '@typescript-eslint/ban-ts-ignore': [
      0,
    ],
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  ignorePatterns: [
    'node_modules/',
    '**/generated/',
  ],
  plugins: [
    'react',
    '@typescript-eslint',
  ],
};
