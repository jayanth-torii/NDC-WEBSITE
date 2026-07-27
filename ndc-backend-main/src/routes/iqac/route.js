const Model = require("../../models/iqac/model");
const { createSingletonRouter } = require("../../utils/singletonFactory");

module.exports = createSingletonRouter(Model);
