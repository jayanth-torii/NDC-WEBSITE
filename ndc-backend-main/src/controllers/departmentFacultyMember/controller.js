const Model = require("../../models/departmentFacultyMember/model");
const { createSingletonController } = require("../../utils/singletonFactory");

module.exports = createSingletonController(Model);
