module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui', '@nextstack/ui'],
          config: '../../packages/ui/src/config/tamagui.config.ts',
          logTimings: true,
        },
      ],
      'react-native-worklets/plugin',
    ],
  };
};