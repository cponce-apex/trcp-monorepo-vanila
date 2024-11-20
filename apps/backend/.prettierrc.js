module.exports = {
  semi: true,
  trailingComma: 'none',
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  bracketSpacing: true,
  endOfLine: 'auto',
  overrides: [
    {
      files: '*.test.ts',
      options: {
        printWidth: 150,
      },
    },
  ],
};
