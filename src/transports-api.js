"use strict";
const fs = require("fs");
const pathCus = require("./common/pathCus");
const result = require("./common/result");
const { isArray } = require("util");
const path = pathCus.getPath("transports.json");
module.exports = {
  getAll: (req, res) => {
    const data = JSON.parse(fs.readFileSync(path, "utf8"));
    res.json(result.resultBean(data, 200, "OK"));
  },
  getTransportsByCompanyId: (req, res) => {
    let data = JSON.parse(fs.readFileSync(path, "utf8"));
    data = isArray(data)
      ? data.filter((res) => res[`company_id`] == req.params.companyId)
      : [];
    console.log(req.params.companyId);
    res.json(result.resultBean(data, 200, "OK"));
  },
};
