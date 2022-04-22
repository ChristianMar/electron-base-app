const { GitRevisionPlugin } = require('git-revision-webpack-plugin');
var path = require('path');

module.exports = (env, options) => {
  process.env.STAGE = env.dev === true ? 'dev' : 'prod';
  var gitRevisionPlugin = new GitRevisionPlugin();
  var rootPath = path.join(__dirname, '..');

  var webappStageConfig = require(path.join(
    rootPath,
    'data',
    process.env.STAGE + '.desktop'
  ));
  var webappConfig = require(path.join(rootPath, 'data', 'config.webapp'));

  var config = {
    STAGE: process.env.STAGE,
    FAVICON: process.env.FAVICON,
    BUILD_TIMESTAMP: Date.now(),
    VERSION: gitRevisionPlugin.version(),
    COMMIT: gitRevisionPlugin.commithash(),
    BRANCH: gitRevisionPlugin.branch(),
  };

  Object.assign(config, webappStageConfig, webappConfig);

  console.log('webappStageConfig', config);

  return config;
};
