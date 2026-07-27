const Model = require("../../models/departmentResearch/model");
const { createSingletonRouter } = require("../../utils/singletonFactory");

module.exports = createSingletonRouter(Model);
