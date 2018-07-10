const fs = require("fs");

export default (dataUri, path) =>
  new Promise((resolve, reject) => {
    const base64Data = dataUri.replace(/^data:image\/png;base64,/, "");

    fs.writeFile(path, base64Data, "base64", err => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
