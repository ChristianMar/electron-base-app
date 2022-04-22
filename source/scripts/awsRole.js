const os = require('os');
const fs = require('fs');
const AWS = require('aws-sdk');

module.exports = (env, roleSessionName, durationCredentials, project) => {
  return new Promise((resolve, reject) => {
    return fs.readFile(
      os.homedir() + '/.aws/credentials',
      'utf8',
      (err, data) => {
        if (err) {
          return reject(err);
        }

        let REG_GROUP = /^\s*\[(.+?)\]\s*$/;
        let REG_PROP = /^\s*([^#].*?)\s*=\s*(.*?)\s*$/;
        let object = {};
        let lines = data.split('\n');
        let group;
        let match;
        for (let i = 0, len = lines.length; i !== len; i++) {
          if ((match = lines[i].match(REG_GROUP)))
            object[match[1]] = group = object[match[1]] || {};
          else if (group && (match = lines[i].match(REG_PROP)))
            group[match[1]] = match[2];
        }

        if (!object[`${project}-master`]) {
          return reject('master profile not found');
        }

        if (!object[`${project}-${env}`]) {
          return reject(`${env} profile not found`);
        }

        if (!object[`${project}-${env}`].role_arn) {
          return reject(`${env} role not found`);
        }

        let master = object[`${project}-master`];
        let role = object[`${project}-${env}`].role_arn;

        AWS.config.credentials = new AWS.Credentials(
          master.aws_access_key_id,
          master.aws_secret_access_key
        );
        AWS.config.region = master.region;
        let sts = new AWS.STS({ apiVersion: '2011-06-15' });
        sts.getCallerIdentity({}, (err, identity) => {
          if (!err) {
            sts.assumeRole(
              {
                DurationSeconds: durationCredentials,
                RoleArn: role,
                RoleSessionName: roleSessionName,
              },
              function(err, data) {
                if (err) {
                  return reject(err);
                } else {
                  return resolve(data);
                }
              }
            );
          }
        });
      }
    );
  });
};
