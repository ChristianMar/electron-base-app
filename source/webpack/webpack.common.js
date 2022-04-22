/*eslint-disable*/
const path = require('path');
const createStage = require('./createStage.js');

module.exports = (env, options) => {
  console.log('WEBPACK BASE', env, options);
  var rootPath = path.join(__dirname, '..', '..');
  const webappStageConfig = createStage(env, options);

  var PATHS = {
    ROOT: rootPath,
    MAIN: path.join(rootPath, 'source', 'app', 'main'),
    WEBAPP: path.join(rootPath, 'source', 'app', 'webapp'),
    UI: path.join(rootPath, 'source', 'app', 'ui'),
  };

  return {
    module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          include: PATHS.ROOT,
          exclude: /node_modules/,
          use: [
            {
              loader: 'style-loader',
              options: {
                injectType: 'singletonStyleTag',
              },
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
        {
          test: /\.(scss|css)$/,
          include: /node_modules/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: { presets: ['@babel/env', '@babel/preset-react'] },
        },
        {
          test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2|mp3)(\?v=[0-9]\.[0-9]\.[0-9])?(\?[a-zA-Z0-9]{1,})?$/,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.mjs', '.cjs'],
      modules: [
        path.resolve(path.join(PATHS.ROOT, 'node_modules')),
        path.resolve(path.join(PATHS.WEBAPP, 'node_modules')),
        path.resolve(path.join(PATHS.MAIN, 'node_modules')),
        path.resolve(path.join(PATHS.UI, 'node_modules')),
      ],
      alias: {
        '@main': path.resolve(PATHS.MAIN, 'src'),
        '@ui': path.resolve(PATHS.UI, 'src'),
      },
    },
  };
};
