const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  publicPath: "",
  devServer: {
    historyApiFallback: true,
  },
});