const { exec } = require('child_process');

module.exports = () => {
  return new Promise((resolve, reject) => {
    return exec('git describe', (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      resolve(stdout.replace(/\n/g, ''));
    });
  });
};
