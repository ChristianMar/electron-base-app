const builder = require('electron-builder');
const Platform = builder.Platform;
const log = require('./console-colour.js');
const path = require('path');
const awsRole = require('./awsRole');
const describe = require('./describe');

const linuxTargets = [
  { target: 'deb', arch: ['x64'] },
  { target: 'rpm', arch: ['x64'] },
  { target: 'AppImage', arch: ['x64'] },
];
const winTargets = [{ target: 'nsis', arch: ['x64'] }];
const macTargets = [{ target: 'dmg', arch: ['x64'] }];

/* 
  flags:
    so: --mac or --win or --linux
    publish: --publish=always or --publish=never
    env: --env=dev or --env=uat or --env=prod
*/
let flags = process.argv;
let version = '';
let shortVersion = '';
let buildTarget = '';
let buildName = '';
let publish = 'never';
let env = 'dev';
let data;

for (let flag of flags) {
  if (!flag.includes('/')) {
    if (flag.includes('--env=')) {
      env = flag.replace('--env=', '');
    } else if (flag.includes('--publish=')) {
      publish = flag.replace('--publish=', '');
    } else if (flag.includes('--')) {
      buildTarget = flag;
      buildName = flag.replace('--', '');
    }
  }
}

data = require(`../data/${env}.desktop`);

// Set the current working directory to the app's root.
process.chdir(path.resolve(__dirname, '../', '../'));
log.info(`CWD is: ${process.cwd()}`, buildTarget);

if (buildTarget.length === 0) {
  // We need at least one build target, so let's assume the current platform
  switch (process.platform) {
    case 'darwin':
      buildTarget = '--mac';
      break;
    case 'win32':
      buildTarget = '--win';
      break;
    case 'linux':
      buildTarget = '--linux';
      break;
  }
}

log.info(
  `STARTING BUILD PROCESS - flags: ${flags}, version ${version}, shortVersion: ${shortVersion}, buildTarget: ${buildTarget}, buildName : ${buildName}, publish: ${publish}, env: ${env}, PACKAGE_DESKTOP: ${data.PACKAGE_DESKTOP}, PROJECT: ${data.PROJECT}, APP_NAME: ${data.APP_NAME}`
);

describe()
  .then((result) => {
    console.log('result', result);
    version = result;
    shortVersion =
      result.search('-') === -1
        ? result
        : result.substring(0, result.search('-'));

    let config = {
      appId: data.PACKAGE_DESKTOP,
      productName: data.PROJECT,
      copyright: `Copyright © ${new Date().getFullYear()} ${
        data.APP_NAME
      }. All rights reserved`,
      buildVersion: buildName === 'win' ? version.replace('v', '') : version,
      files: [
        'build/*',
        '!**/node_modules/**/*',
        {
          from: './app/webapp/src/',
          to: '.',
          filter: ['package.json'],
        },
      ],
      directories: {
        output: `release-${buildName}`,
        buildResources: 'build',
      },
      extraMetadata: {
        main: 'build/background.js',
      },
      linux: {
        target: linuxTargets,
        artifactName: `${data.PROJECT}-${shortVersion}${'-${arch}.${ext}'}`,
        icon: 'source/icons/linux',
        category: 'Office',
        maintainer: data.PROJECT,
        vendor: data.PROJECT,
      },
      win: {
        target: winTargets,
        artifactName: `${data.PROJECT}-${shortVersion}${'-${arch}.${ext}'}`,
        icon: 'source/icons/win/icon.ico',
        legalTrademarks: `Copyright © ${new Date().getFullYear()} ${
          data.APP_NAME
        }. All rights reserved`,
      },
      nsis: {
        oneClick: true,
        perMachine: false,
        allowElevation: true,
        uninstallDisplayName: data.PROJECT,
        installerIcon: 'source/icons/win/icon.ico',
        // license: 'txt'
      },
      mac: {
        category: 'public.app-category.productivity',
        target: macTargets,
        artifactName: `${data.PROJECT}-${shortVersion}${'-${arch}.${ext}'}`,
        // icon: 'source/icons/mac/icon.icns',
        minimumSystemVersion: '10.6.0',
        hardenedRuntime: true,
        // provisioningProfile: ''
        // type: ''
      },
      dmg: {
        // icon: 'source/icons/mac/icon.icns',
      },
      // publish: {
      //   provider: 's3',
      //   bucket: data.BUCKET_DISTRO,
      //   region: data.REGION,
      //   path: `/releases/${buildName}`,
      //   acl: 'private',
      // },
    };

    runBuilder()
      .then(() => {
        log.success(
          `Build ${
            data.PROJECT
          }-${shortVersion}, version ${version}, building for: ${buildTarget}, in folder: release-${buildName}, env: ${env} ${
            publish === 'never' ? '' : 'and publishing'
          } COMPLETE!`
        );
      })
      .catch((err) => {
        log.error('Build failed!');
        log.error(err);
        // We have to exit the process with an
        // error signal for correct behaviour on CI
        process.exit(1);
      });

    async function runBuilder() {
      let target;
      let pattern = new RegExp(/^v\d+(\.\d+)+(\.\d+)$/g);
      if (buildTarget === '--mac') target = Platform.MAC.createTarget();
      if (buildTarget === '--win') target = Platform.WINDOWS.createTarget();
      if (buildTarget === '--linux') target = Platform.LINUX.createTarget();
      if (version === '') {
        log.error('Build failed! Version is required.');
        process.exit(1);
      }
      if (!pattern.test(shortVersion)) {
        log.error('Build failed! Version format is v<major>.<minor>.<patch>');
        process.exit(1);
      }
      if (publish === 'always') {
        await awsRole(
          env,
          `${data.PROJECT}-${shortVersion}`,
          1000,
          data.PROJECT
        )
          .then((result) => {
            process.env.AWS_ACCESS_KEY_ID = result.Credentials.AccessKeyId;
            process.env.AWS_SECRET_ACCESS_KEY =
              result.Credentials.SecretAccessKey;
            process.env.AWS_SESSION_TOKEN = result.Credentials.SessionToken;
          })
          .catch((err) => {
            log.error(`Build failed! ${err}`);
            process.exit(1);
          });
      }
      await builder.build({
        targets: target,
        config: config,
        publish: publish,
      });
    }
  })
  .catch((err) => {
    log.error(`Build failed! ${err}`);
    process.exit(1);
  });
