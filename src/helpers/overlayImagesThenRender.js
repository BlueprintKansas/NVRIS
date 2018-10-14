const Promise = require("bluebird");
const gm = require("gm").subClass({ imageMagick: true });
require("gm-base64");

Promise.promisifyAll(gm.prototype);

export default (topImagePath, bottomImagePath, x, y, outImagePath) =>
  new Promise((resolve, reject) => {
    gm()
      .command("composite")
      .in("-gravity", "NorthWest")
      .in("-geometry", `+${x}+${y}`)
      .in(topImagePath)
      .in(bottomImagePath)
      .write(outImagePath, (err) => {
        if (err) {
          console.log("ERROR: ", err);
          reject(err);
        } else {
          console.log("composite image rendered to ", outImagePath);
          resolve();
        }
      });
  });
