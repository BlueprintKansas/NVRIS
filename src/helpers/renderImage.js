export default (gmImg, path) =>
  new Promise((resolve, reject) => {
    gmImg.write(path, err => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve();
    });
  });
