var https = require('https');
var fs = require('fs');

let unit = module.exports = {
    "saveFromUrlUsingHttps": (url, dest, cb) => {
        var file = fs.createWriteStream(dest);
        var request = https.get(url, function (response) {
            response.pipe(file);
            file.on('finish', function () {
                file.close(cb);  // close() is async, call cb after close completes.
            });
        }).on('error', function (err) { // Handle errors
            fs.unlink(dest); // Delete the file async. (But we don't check the result)
            if (cb) cb(err.message);
        });
    },
    "delete": (path) => {
        fs.unlink(path, function (err) {
            if (err) {
                console.log(err);
            }
        });
    }
}