const Promise = require("bluebird");
const gm = require("gm").subClass({ imageMagick: true });
require("gm-base64");

Promise.promisifyAll(gm.prototype);

export default (path, fileType) =>
  new Promise((resolve, reject) => {
    gm(path).toBase64(fileType, true, (err, base64) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(base64);
      }
    });
  });
