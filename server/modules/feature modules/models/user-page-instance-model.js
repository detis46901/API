"use strict";
var dbConnection = require('../../../core/db-connection');
var PageModel = require('../../users/models/page-model');
var ModuleInstanceModel = require('./module-instances-model');
var UserModel = require('../../users/models/user-model');
var sequelize_1 = require("sequelize");
var db = dbConnection();
var sequalizeModel = db.define('user_page_instance', {
    ID: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    defaultON: {
        type: sequelize_1.DataTypes.BOOLEAN },
    instanceOrder: {
        type: sequelize_1.DataTypes.INTEGER }
});
sequalizeModel.belongsTo(UserModel.model);
sequalizeModel.belongsTo(PageModel.model);
sequalizeModel.belongsTo(ModuleInstanceModel.model);
sequalizeModel.sync();
exports.model = sequalizeModel;

//# sourceMappingURL=../../../source-maps/modules/feature modules/models/user-page-instance-model.js.map
