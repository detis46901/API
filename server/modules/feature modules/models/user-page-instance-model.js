"use strict";
var dbConnection = require('../../../core/db-connection');
var Sequelize = require('sequelize');
var PageModel = require('../../users/models/page-model');
var ModuleInstanceModel = require('./module-instances-model');
var UserModel = require('../../users/models/user-model');
var db = dbConnection();
var sequalizeModel = db.define('user_page_instance', {
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    defaultON: {
        type: Sequelize.BOOLEAN },
    instanceOrder: {
        type: Sequelize.INTEGER }
});
sequalizeModel.belongsTo(UserModel.Model);
sequalizeModel.belongsTo(PageModel.Model);
sequalizeModel.belongsTo(ModuleInstanceModel.Model);
sequalizeModel.sync();
exports.Model = sequalizeModel;

//# sourceMappingURL=../../../source-maps/modules/feature modules/models/user-page-instance-model.js.map
