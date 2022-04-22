const { exec } = require('child_process');

module.exports = () => {
  return new Promise((resolve, reject) => {
    return exec('git describe', (error, stdout, stderr) => {
      if (error) {
        console.log('error', error);
        reject(error);
      }
      console.log('stdout', stdout);
      resolve(stdout.replace(/\n/g, ''));
    });
  });
};
