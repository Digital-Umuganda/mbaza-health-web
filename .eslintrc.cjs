module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'eslint-config-prettier',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prettier'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'prettier/prettier': [
      'error',
      {
        semi: true,
        endOfLine: 'auto',
        printWidth: 70,
        singleQuote: true,
        tabWidth: 2,
        useTabs: false,
        arrowParens: 'avoid',
        bracketSameLine: false,
        trailingComma: 'all',
      },
    ],
  },
};
