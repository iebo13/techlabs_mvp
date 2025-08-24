import prettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'
import js from '@eslint/js'
import globals from 'globals'
import reactRefresh from 'eslint-plugin-react-refresh'
import { globalIgnores } from 'eslint/config'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import unusedImports from 'eslint-plugin-unused-imports'

export default [
  {
    ignores: [
      'dist/*',
      'build/*',
      'node_modules/*',
      '.cursor/*',
      'src/vite-env.d.ts',
      'coverage/*',
      '*.min.js',
      '*.bundle.js',
      '*.log',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      '*.pid',
      '*.seed',
      '*.pid.lock',
      '*.lcov',
      '*.tgz',
      '.yarn-integrity',
      '.env*',
      '.cache/*',
      '.parcel-cache/*',
      '.next/*',
      '.nuxt/*',
      '.vuepress/dist/*',
      '.serverless/*',
      '.fusebox/*',
      '.dynamodb/*',
      '.tern-port',
      'lighthouseReport.json',
      'memory-bank/*',
      '.cursor/*',
      '.vscode/*',
      '.DS_Store',
      '.DS_Store?',
      '._*',
      '.Spotlight-V100',
      '.Trashes',
      'ehthumbs.db',
      'Thumbs.db',
      'tmp/*',
      'temp/*',
    ],
  },
  // Configuration for test files with vitest globals
  {
    files: [
      'src/**/*.test.{js,jsx,ts,tsx}',
      'src/**/__tests__/**/*.{js,jsx,ts,tsx}',
      'src/test/**/*.{js,jsx,ts,tsx}',
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.test.json',
        tsconfigRootDir: '.',
      },
      globals: {
        ...globals.browser,
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        test: 'readonly',
        vi: 'readonly',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.test.json',
        },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react,
      'react-hooks': reactHooks,
      import: importPlugin,
      'unused-imports': unusedImports,
      'react-refresh': reactRefresh,
    },
    rules: {
      // Relaxed rules for test files
      '@typescript-eslint/no-explicit-any': 'off',
      'max-lines': 'off',
      'max-lines-per-function': 'off',
      'no-console': 'off',

      // Keep important TypeScript rules
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],

      // React rules
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react-hooks/rules-of-hooks': 'error',

      // Import rules
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          // never have newlines between imports
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'unused-imports/no-unused-imports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  // Configuration for app source files with strict TypeScript checking
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    ignores: [
      'src/**/*.test.{js,jsx,ts,tsx}',
      'src/**/__tests__/**/*.{js,jsx,ts,tsx}',
      'src/test/**/*.{js,jsx,ts,tsx}',
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.app.json',
        tsconfigRootDir: '.',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.app.json',
        },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react,
      'react-hooks': reactHooks,
      import: importPlugin,
      js: js.configs.recommended,
      reactHooks: reactHooks.configs['recommended-latest'],
      reactRefresh: reactRefresh.configs.vite,
      unicorn: eslintPluginUnicorn,
      'unused-imports': unusedImports,
      'react-refresh': reactRefresh,
      import: importPlugin,
    },
    rules: {
      /* Discourage classes and speculative memoization */
      'no-restricted-syntax': [
        'warn',
        {
          selector:
            "CallExpression[callee.name='useCallback'], CallExpression[callee.name='useMemo']",
          message:
            'Avoid speculative memoization. Only use useCallback/useMemo with proven perf needs (document in code review).',
        },
        'error',
        {
          selector: 'ClassDeclaration',
          message: 'Classes are not allowed in this codebase (use functions + composition).',
        },
        {
          selector: 'ClassExpression',
          message: 'Classes are not allowed. Use functions instead.',
        },
      ],
      // TypeScript specific rules
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'], // prefer type aliases
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      '@typescript-eslint/explicit-function-return-type': 'off', // allow inference for readability
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/consistent-type-exports': [
        'error',
        { fixMixedExportsWithInlineTypeSpecifier: true },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'typeLike', format: ['PascalCase'] },
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: { regex: '^I[A-Z]', match: false },
        },
        { selector: 'enum', format: ['PascalCase'] },
        { selector: 'typeAlias', format: ['PascalCase'] },
        { selector: 'variable', format: ['camelCase', 'UPPER_CASE', 'PascalCase'] },
        { selector: 'function', format: ['camelCase', 'PascalCase'] },
        { selector: 'parameter', format: ['camelCase'], leadingUnderscore: 'allow' },
        {
          selector: 'memberLike',
          modifiers: ['private'],
          format: ['camelCase'],
          leadingUnderscore: 'require',
        },
      ],

      // React specific rules
      'react/function-component-definition': [
        'error',
        { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
      ],
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/no-array-index-key': 'error', // stable keys
      'react/no-unstable-nested-components': ['error', { allowAsProps: true }], // no inline anon components
      'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
      'react/jsx-props-no-spreading': 'off', // composition friendly
      'react/jsx-uses-react': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
      'react/self-closing-comp': ['warn', { component: true, html: true }],
      /* Import rules */
      'import/prefer-default-export': 'off',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
          pathGroups: [
            { pattern: 'react', group: 'external', position: 'before' },
            { pattern: '@mui/**', group: 'external', position: 'after' },
            { pattern: 'src/**', group: 'internal' },
          ],
          pathGroupsExcludedImportTypes: ['react'],
        },
      ],
      'unused-imports/no-unused-imports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      /* Block direct axios + legacy MUI styles; enforce feature boundaries */
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'axios',
              message: 'Use src/config/http.ts instead of importing axios directly.',
            },
            {
              name: '@mui/styles',
              message: 'Legacy styling API is not allowed. Use sx / styled from @mui/material.',
            },
            { name: 'styled-components', message: 'Use MUI sx/system instead.' },
            { name: 'sass', message: 'Use MUI sx/system instead.' },
          ],
          patterns: [
            {
              group: ['src/features/*/**'],
              message:
                'Avoid deep cross-feature imports. Re-export a feature public API from src/features/<feature>/index.ts and import from there.',
            },
          ],
        },
      ],

      /* =============================
       * Repository hygiene
       * ============================= */
      'unicorn/filename-case': ['error', { cases: { camelCase: true, pascalCase: true } }], // folders camelCase, component files PascalCase ok
      'max-lines': ['error', { max: 220, skipBlankLines: true, skipComments: true }],
      // 'max-lines-per-function': [
      //   'warn',
      //   { max: 220, skipBlankLines: true, skipComments: true, IIFEs: true },
      // ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-alert': 'error',
    },
    // // General rules
    // "prefer-const": "error",
    // "no-var": "error",
    // "object-shorthand": "warn",
    // eqeqeq: ["warn", "always"],

    // // Spacing and formatting rules
    // "padding-line-between-statements": [
    //   "error",
    //   { blankLine: "always", prev: "*", next: "return" },
    //   { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
    //   {
    //     blankLine: "any",
    //     prev: ["const", "let", "var"],
    //     next: ["const", "let", "var"],
    //   },
    //   { blankLine: "always", prev: "directive", next: "*" },
    //   { blankLine: "always", prev: "block-like", next: "*" },
    // ],
    // "lines-around-comment": [
    //   "error",
    //   {
    //     beforeBlockComment: true,
    //     beforeLineComment: true,
    //     allowBlockStart: true,
    //     allowClassStart: true,
    //     allowObjectStart: true,
    //     allowArrayStart: true,
    //   },
    // ],
    // "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 0, maxBOF: 0 }],
    // "object-curly-spacing": ["error", "always"],
    // "array-bracket-spacing": ["error", "never"],
    // "comma-spacing": ["error", { before: false, after: true }],
  },

  prettier,
]
