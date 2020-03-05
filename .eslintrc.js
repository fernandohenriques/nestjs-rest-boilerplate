module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'nestjs'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:nestjs/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'no-console': 0,
    'semi': ["error", "always"],
    'eqeqeq': ["error", "always"],
    'object-curly-spacing': ["error", "always"],
    "comma-dangle": ["error", "always-multiline"],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
