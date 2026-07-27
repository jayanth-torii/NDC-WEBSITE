const Model = require("../../models/bookPatient/model");
const { createSingletonRouter } = require("../../utils/singletonFactory");

module.exports = createSingletonRouter(Model);
