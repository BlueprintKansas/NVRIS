const path = require("path");
const fs = require("fs");

export default directory =>
  new Promise((resolve, reject) => {
    fs.readdir(directory, (err, files) => {
      if (err) throw err;
      files.forEach(file =>
        fs.unlink(path.join(directory, file), error => {
          if (error) reject(error);
        })
      );

      resolve();
    });
  });
