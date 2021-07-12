"use strict";
const fs = require("fs");
const pathCus = require("./common/pathCus");
const result = require("./common/result");
const { isArray, isObject } = require("util");
const path = pathCus.getPath("cars.json");

const carObj = {
  id: 0,
  matter: "",
  date_in_yard: "",
  car: "",
  vin_no: "",
  booking_day: "",
  EC: "",
  parking_day: "",
  remarks: "",
  customer: "",
  inspection_company: "",
  transport_id: 0,
};
module.exports = {
  getAll: (req, res) => {
    const data = JSON.parse(fs.readFileSync(path, "utf8"));
    res.json(result.resultBean(data, 200, "OK"));
  },
  getCarByTransportId: (req, res) => {
    let data = JSON.parse(fs.readFileSync(path, "utf8"));
    data = isArray(data)
      ? data.filter((res) => res[`transport_id`] == req.params.transportId)
      : [];
    res.json(result.resultBean(data, 200, "OK"));
  },
  addNew: (req, res) => {
    let dataInput = req.body;
    if (!isObject(dataInput)) {
      res.json(result.resultBean(null, 400, "BAD_REQUEST"));
    }

    for (const key of Object.keys(carObj)) {
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
    res.json(result.resultBean(dataInput, 201, "Added"));
  },
  update: (req, res) => {
    let dataInput = req.body;
    let id = req.params.carId;
    if (!id || !isObject(dataInput)) {
      res.json(result.resultBean(null, 400, "BAD_REQUEST"));
    }
    let data = JSON.parse(fs.readFileSync(path, "utf8"));
    let object = isArray(data) ? data.find((res) => res[`id`] == id) : {};
    if (!object || Object.keys(object).length === 0) {
      res.json(
        result.resultBean(null, "ERROO1", "Not found car by id : " + id)
      );
    }
    for (const key of Object.keys(carObj)) {
      if (key != "id" || key != "transport_id") {
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
