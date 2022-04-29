const fs = require('fs');

const writeFile = (fileName, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(fileName, JSON.stringify(data), (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

module.exports = { writeFile };
