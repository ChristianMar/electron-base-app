/*eslint-disable*/
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { GitRevisionPlugin } = require('git-revision-webpack-plugin');
const common = require('./webpack.common.js');
const createStage = require('./createStage.js');
const path = require('path');

module.exports = (env, options) => {
  console.log('DEV', env, options);
  const webpackConfig = common(env, options);
  const webappStageConfig = createStage(env, options);
  const rootPath = path.join(__dirname, '..', '..');

  return merge(webpackConfig, {
    entry: path.join(rootPath, 'source', 'app', 'webapp', 'src', 'index.js'),
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      static: {
        directory: path.join(rootPath, 'source', 'app', 'webapp', 'src'),
      },
      compress: true,
      port: 8081,
      // contentBase: path.join(rootPath, 'source', 'app', 'webapp', 'src'),
      // port: 8080,
      // watchContentBase: true,
      // compress: true,
      // public: 'localhost:8081',
      https: true,
      // disableHostCheck: true,
      // historyApiFallback: true,
      // inline: true,
      // disable hot reload
      liveReload: false,
      hot: false,
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
      new webpack.EnvironmentPlugin(webappStageConfig),
      new GitRevisionPlugin(),
      new HtmlWebpackPlugin({
        inject: true,
        FAVICON:
          `<link rel="shortcut icon" type="image/png" href="data:image/png;base64,` +
          webappStageConfig.FAVICON +
          `"/>`,
        APP_NAME: webappStageConfig.APP_NAME,
        template: path.join(
          rootPath,
          'source',
          'app',
          'webapp',
          'src',
          'index.html'
        ),
      }),
    ],
  });
};
