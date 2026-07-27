const Model = require("../../models/library/model");
const { createSingletonController } = require("../../utils/singletonFactory");

module.exports = createSingletonController(Model);
