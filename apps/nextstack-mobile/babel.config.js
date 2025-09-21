module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          logTimings: true,
        },
      ],
      'react-native-worklets/plugin',
    ],
  };
};