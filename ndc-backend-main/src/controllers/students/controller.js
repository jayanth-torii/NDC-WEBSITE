const Model = require("../../models/students/model");
const { createSingletonController } = require("../../utils/singletonFactory");

module.exports = createSingletonController(Model);
