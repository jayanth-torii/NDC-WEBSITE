const Model = require("../../models/bookPatient/model");
const { createSingletonController } = require("../../utils/singletonFactory");

module.exports = createSingletonController(Model);
