module.exports = {
  presets: [['babel-preset-expo', { unstable_transformImportMeta: true }]],
  plugins: [
    ['react-native-worklets-core/plugin'],
    ['react-native-reanimated/plugin'],
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    ['@babel/plugin-proposal-optional-catch-binding'],
    [
      '@babel/plugin-transform-class-properties',
      {
        loose: true,
      },
    ],
    [
      '@babel/plugin-transform-private-methods',
      {
        loose: true,
      },
    ],
    [
      '@babel/plugin-transform-private-property-in-object',
      {
        loose: true,
      },
    ],
  ],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
};