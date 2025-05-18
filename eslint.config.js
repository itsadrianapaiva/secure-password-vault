const js = require('@eslint/js');
const prettier = require('eslint-plugin-prettier');
const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = [
  { ...js.configs.recommended },
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        require: 'readonly',
        module: 'readonly',
        exports: 'writable',
        ...js.configs.recommended.languageOptions?.globals,
      },
      sourceType: 'commonjs',
      ecmaVersion: 'latest',
    },
    plugins: {
      prettier: prettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  {
    ignores: ['node_modules/', 'dist/', 'build/'],
  },
  eslintConfigPrettier,
];
