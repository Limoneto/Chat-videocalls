/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// Add `react-native` to `transpileModules` so Metro parses its TS/Flow code
const extraNodeModules = [];
const transpileModules = ['react-native', 'react-native-reanimated'];

const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    // Allow Metro to process TS/modern JS in react-native and other specified modules
    blacklistRE: defaultConfig.resolver.blacklistRE,
    sourceExts: [...defaultConfig.resolver.sourceExts, 'cjs', 'ts', 'tsx'],
    extraNodeModules: extraNodeModules.reduce((acc, name) => {
      acc[name] = require.resolve(name);
      return acc;
    }, {}),
  },
  watchFolders: transpileModules.map(m => `${__dirname}/node_modules/${m}`),
};

module.exports = mergeConfig(defaultConfig, config);
