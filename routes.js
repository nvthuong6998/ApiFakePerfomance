"use strict";
module.exports = function (app) {
  let company = require("./src/company-api");
  app.route("/companies").get(company.getAll);

  app.route("/companies/:companyId").get(company.getById);

  // ---------------------------------------
  let transports = require("./src/transports-api");
  app.route("/transports").get(transports.getAll);

  app
    .route("/transportsByCompanyId/:companyId")
    .get(transports.getTransportsByCompanyId);

  // ---------------------------------------
  let car = require("./src/car-api");
  app.route("/cars").get(car.getAll);

  app.route("/carsByTransportId/:transportId").get(car.getCarByTransportId);

  app.route("/car").post(car.addNew);

  app.route("/car/:carId").put(car.update);

  // --------------------------------
  let contentBrowsing = require("./src/contentBrowsing-api");
  app.route("/contentBrowsings").get(contentBrowsing.getAll);
  app.route("/contentBrowsing").post(contentBrowsing.addNew);
  app.route("/contentBrowsing/:cBrId").put(contentBrowsing.update);
};
