const Model = require("../../models/objective/model");
const { createSingletonRouter } = require("../../utils/singletonFactory");

module.exports = createSingletonRouter(Model);
