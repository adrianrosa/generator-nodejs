const fs = require('fs');

exports.createFolder = (path, sync = false) => {
    if (sync) {
        fs.mkdirSync(path);
        return;
    }
    fs.mkdir(path, err => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`create ${path}`);
    });
}