/**
 * TechLabs MVP Commitlint Configuration
 * Enhanced configuration following conventional commits best practices
 * Based on @commitlint/config-conventional with additional rules
 *
 * @see https://conventionalcommits.org/
 * @see https://commitlint.js.org/
 */

export default {
  extends: ['@commitlint/config-conventional'],

  rules: {
    // Type Configuration
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation only changes
        'style', // Code style changes (formatting, no logic change)
        'refactor', // Code refactoring (no new features or bug fixes)
        'perf', // Performance improvements
        'test', // Adding or updating tests
        'chore', // Maintenance tasks, tooling, dependencies
        'ci', // CI/CD pipeline changes
        'build', // Build system or external dependencies
        'revert', // Reverting previous changes
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-max-length': [2, 'always', 10],

    // Scope Configuration
    'scope-case': [2, 'always', 'lower-case'],
    'scope-max-length': [2, 'always', 20],
    'scope-min-length': [0], // Allow empty scopes
    'scope-enum': [
      1, // Warning level - not mandatory but encouraged
      'always',
      [
        // Frontend scopes
        'components',
        'hooks',
        'utils',
        'theme',
        'styles',
        'assets',
        'ui',

        // Feature scopes
        'auth',
        'api',
        'home',
        'about',
        'events',
        'partners',
        'stories',
        'tracks',

        // Backend scopes (if applicable)
        'server',
        'database',
        'models',
        'controllers',
        'middleware',
        'services',

        // Infrastructure scopes
        'docker',
        'deploy',
        'config',
        'env',
        'security',

        // Development scopes
        'deps',
        'devtools',
        'scripts',
        'tests',
        'docs',
        'build',
        'ci',
        'lint',
        'format',

        // Performance scopes
        'perf',
        'bundle',
        'images',
        'loading',
        'cache',

        // Quality scopes
        'a11y',
        'seo',
        'analytics',
        'monitoring',
        'errors',
      ],
    ],

    // Subject Configuration
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-max-length': [2, 'always', 50], // Shorter for better readability
    'subject-min-length': [2, 'always', 3],
    'subject-exclamation-mark': [2, 'never'], // Use ! only in type/scope

    // Header Configuration
    'header-case': [2, 'always', 'lower-case'],
    'header-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100], // Git standard
    'header-min-length': [2, 'always', 10],

    // Body Configuration
    'body-leading-blank': [2, 'always'], // Blank line before body
    'body-max-line-length': [2, 'always', 140],
    'body-min-length': [0], // Allow empty body
    'body-case': [0], // No case restrictions for body

    // Footer Configuration
    'footer-leading-blank': [2, 'always'], // Blank line before footer
    'footer-max-line-length': [2, 'always', 140],
    'footer-min-length': [0], // Allow empty footer
  },

  // Parser Preset for enhanced parsing
  parserPreset: {
    parserOpts: {
      // Custom header pattern to support additional formats
      headerPattern: /^(\w*)(?:\(([^)]*)\))?(!)?:\s(.+)$/,
      headerCorrespondence: ['type', 'scope', 'breaking', 'subject'],

      // Issue prefixes for reference parsing
      issuePrefixes: ['#', 'PROJ-', 'ISSUE-', 'TICKET-'],

      // Breaking change keywords
      noteKeywords: ['BREAKING CHANGE', 'BREAKING-CHANGE', 'BREAKING'],

      // Field patterns for footers
      fieldPattern: /^(\w+(?:-\w+)*): (.+)$/,

      // Revert pattern
      revertPattern: /^(?:revert|revert:)\s"?([\s\S]+?)"?\s*$/,
      revertCorrespondence: ['header'],

      // Comment character
      commentChar: '#',

      // Warn on unknown fields
      warn: true,
    },
  },

  // Custom ignores for merge commits, version tags, etc.
  ignores: [
    // Default ignores are preserved
    commit => commit === '',
    commit => commit.includes('WIP'),
    commit => commit.includes('wip'),
    commit => /^Merge/.test(commit),
    commit => /^Revert/.test(commit),
    commit => /^v\d+\.\d+\.\d+/.test(commit), // Version tags
    commit => /^release/.test(commit), // Release commits
    commit => /^hotfix/.test(commit), // Hotfix commits
  ],

  // Default ignores enabled
  defaultIgnores: true,

  // Custom help URL
  helpUrl: 'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',

  // Formatter
  formatter: '@commitlint/format',

  // Prompt configuration for interactive commits
  prompt: {
    messages: {
      skip: 'skip',
      max: 'upper %d chars',
      min: '%d chars at least',
      emptyWarning: 'can not be empty',
      upperLimitWarning: 'over limit',
      lowerLimitWarning: 'below limit',
    },
    questions: {
      type: {
        description: "Select the type of change that you're committing:",
        enum: {
          feat: {
            description: 'A new feature for users',
            title: 'Features',
            emoji: '✨',
          },
          fix: {
            description: 'A bug fix for users',
            title: 'Bug Fixes',
            emoji: '🐛',
          },
          docs: {
            description: 'Documentation only changes',
            title: 'Documentation',
            emoji: '📚',
          },
          style: {
            description:
              'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
            title: 'Styles',
            emoji: '💎',
          },
          refactor: {
            description: 'A code change that neither fixes a bug nor adds a feature',
            title: 'Code Refactoring',
            emoji: '📦',
          },
          perf: {
            description: 'A code change that improves performance',
            title: 'Performance Improvements',
            emoji: '🚀',
          },
          test: {
            description: 'Adding missing tests or correcting existing tests',
            title: 'Tests',
            emoji: '🚨',
          },
          build: {
            description:
              'Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)',
            title: 'Builds',
            emoji: '🛠',
          },
          ci: {
            description:
              'Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)',
            title: 'Continuous Integrations',
            emoji: '⚙️',
          },
          chore: {
            description: "Other changes that don't modify src or test files",
            title: 'Chores',
            emoji: '♻️',
          },
          revert: {
            description: 'Reverts a previous commit',
            title: 'Reverts',
            emoji: '🗑',
          },
        },
      },
      scope: {
        description: 'What is the scope of this change (e.g. component, feature, or file name)',
      },
      subject: {
        description: 'Write a short, imperative tense description of the change',
      },
      body: {
        description: 'Provide a longer description of the change',
      },
      isBreaking: {
        description: 'Are there any breaking changes?',
      },
      breakingBody: {
        description:
          'A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself',
      },
      breaking: {
        description: 'Describe the breaking changes',
      },
      isIssueAffected: {
        description: 'Does this change affect any open issues?',
      },
      issuesBody: {
        description:
          'If issues are closed, the commit requires a body. Please enter a longer description of the commit itself',
      },
      issues: {
        description: 'Add issue references (e.g. "fix #123", "re #123".)',
      },
    },
  },
}
