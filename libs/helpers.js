const fs = require('fs');

const writeFile = (fileName, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(fileName, JSON.stringify(data), (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

const writeData = (dataName, data) => {
  const filePath = `${__dirname}/../data/${dataName}.json`;
  return writeFile(filePath, data);
};

module.exports = { writeFile, writeData };
