module.exports = {
  // presets: ['@babel/preset-env', '@babel/preset-react'],
  presets: ['module:metro-react-native-babel-preset'],
  // presets: ['module:react-native'],
  plugins: [
    // ['@babel/plugin-proposal-class-properties', { loose: true }],
    // '@babel/transform-runtime',
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ['module-resolver', {
      "extensions": [".js", ".ios.js", ".android.js", "*.jsx", "*.ts", "*.tsx"],
      alias: {
        'App': './App',
      },
    }],
  ],
};
