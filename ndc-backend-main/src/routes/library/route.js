const Model = require("../../models/library/model");
const { createSingletonRouter } = require("../../utils/singletonFactory");

module.exports = createSingletonRouter(Model);
