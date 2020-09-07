"use strict";
var dbConnection = require('../../../core/db-connection');
var ModulesModel = require('./module-model');
var sequelize_1 = require("sequelize");
var db = dbConnection();
var sequalizeModel = db.define('module_instance', {
    ID: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 30]
        }
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    settings: {
        type: sequelize_1.DataTypes.JSON }
});
sequalizeModel.belongsTo(ModulesModel.model);
sequalizeModel.sync();
exports.model = sequalizeModel;

//# sourceMappingURL=../../../source-maps/modules/feature modules/models/module-instances-model.js.map
