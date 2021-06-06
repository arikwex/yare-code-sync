const fs = require('fs');
const path = require('path');

const CODE_SYNC_PATH = path.resolve(`${__dirname}/../dist/code-sync.js`);
const CODE_MAIN_PATH = path.resolve(process.env.CUSTOM_CODE_PATH || `${__dirname}/../dist/main.js`);
console.log(`CODE MAIN PATH: ${CODE_MAIN_PATH}`);

exports.getCodeSync = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(CODE_SYNC_PATH, (err, data) => {
      if (err != null) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

exports.getCodeMain = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(CODE_MAIN_PATH, (err, data) => {
      if (err != null) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

exports.onNewBuild = (callback) => {
  fs.watch(CODE_MAIN_PATH, callback);
};

