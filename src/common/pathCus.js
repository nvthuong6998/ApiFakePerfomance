'use strict';
const path = require('path');
module.exports = {
    getPath: (file_name) => {
        console.log();
        return path.join(process.cwd(), "/src/data/", file_name)
    }
}