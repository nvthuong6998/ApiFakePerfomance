'use strict';
const fs = require('fs');
const pathCus = require('./common/pathCus');
const result = require('./common/result');
module.exports = {
    getAll: (req, res) => {
        const path = pathCus.getPath('company.json');
        const data = JSON.parse(fs.readFileSync(path, 'utf8'));
        res.json(result.resultBean(data, 200, 'OK'));
    },
    getById: (req, res) => {
    }
}