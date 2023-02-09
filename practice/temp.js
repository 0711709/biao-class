const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'directory-name');

function readFiles(dir) {
  fs.readdir(dir, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(function (file) {
      const filePath = path.join(dir, file);
      fs.stat(filePath, function (err, stats) {
        if (err) {
          return console.log('Unable to get file stats: ' + err);
        }
        if (stats.isFile()) {
          fs.readFile(filePath, 'utf-8', function (err, content) {
            if (err) {
              return console.log('Unable to read file: ' + err);
            }
            console.log(content);
          });
        } else if (stats.isDirectory()) {
          readFiles(filePath);
        }
      });
    });
  });
}

readFiles(directoryPath);
