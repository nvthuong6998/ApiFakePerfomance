"use strict";
const fs = require("fs");
const pathCus = require("./common/pathCus");
const result = require("./common/result");
const { isArray, isObject } = require("util");
const path = pathCus.getPath("contentBrowsing.json");

const contentBrowsingObj = {
  id: 0,
  title: "",
  date: "",
  image: "",
  content: "",
  isRead: 0,
};

module.exports = {
  getAll: (req, res) => {
    const data = JSON.parse(fs.readFileSync(path, "utf8"));
    res.json(result.resultBean(data, 200, "OK"));
  },
  getContentBrowsingId: (req, res) => {
    let data = JSON.parse(fs.readFileSync(path, "utf8"));
    data = isArray(data)
      ? data.filter((res) => res[`id`] == req.params.contentBrowsingId)
      : res.json(result.resultBean(data, 200, "OK"));
  },
  addNew: (req, res) => {
    let dataInput = req.body;
    if (!isObject(dataInput)) {
      res.json(result.resultBean(null, 400, "BAD_REQUEST"));
    }

    for (const key of Object.keys(contentBrowsingObj)) {
      if (key != "id") {
        if (!dataInput.hasOwnProperty(key)) {
          res.json(result.resultBean(null, 400, "Not found key: " + key));
        }
      }
    }

    let data = JSON.parse(fs.readFileSync(path, "utf8"));
    const lastId = isArray(data) ? data[data.length - 1][`id`] + 1 : 0;
    dataInput[`id`] = lastId;
    data = isArray(data) ? data : [];
    data.push(dataInput);

    fs.writeFileSync(path, JSON.stringify(data));
    res.json(result.resultBean(data, 201, "Added"));
  },

  update: (req, res) => {
    let dataInput = req.body;
    let id = req.params.cBrId;
    if (!id || !isObject(dataInput)) {
      res.json(result.resultBean(null, 400, "BAD_REQUEST"));
    }
    let data = JSON.parse(fs.readFileSync(path, "utf8"));
    console.log(data);
    let object = isArray(data) ? data.find((res) => res[`id`] == id) : {};
    if (!object || Object.keys(object).length === 0) {
      res.json(
        result.resultBean(null, "ERROO1", "Not found car by id : " + id)
      );
    }
    for (const key of Object.keys(contentBrowsingObj)) {
      if (key != "id" || key != "id") {
        if (!dataInput.hasOwnProperty(key)) {
          res.json(result.resultBean(null, 400, "Not found key: " + key));
        } else {
          object[key] = dataInput[key];
        }
      }
    }
    fs.writeFileSync(path, JSON.stringify(data));
    res.json(result.resultBean(object, 200, "Updated"));
  },
};
