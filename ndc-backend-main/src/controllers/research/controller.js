const Model = require("../../models/research/model");
const { createSingletonController } = require("../../utils/singletonFactory");

module.exports = createSingletonController(Model);
