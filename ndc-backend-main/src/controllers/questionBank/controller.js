const Model = require("../../models/questionBank/model");
const { createSingletonController } = require("../../utils/singletonFactory");

module.exports = createSingletonController(Model);
