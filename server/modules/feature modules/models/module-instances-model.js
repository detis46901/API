"use strict";
var dbConnection = require('../../../core/db-connection');
var ModulesModel = require('./module-model');
var Sequelize = require('sequelize');
var db = dbConnection();
var sequalizeModel = db.define('module_instance', {
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 30]
        }
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    settings: {
        type: Sequelize.JSON }
});
sequalizeModel.belongsTo(ModulesModel.Model);
sequalizeModel.sync();
exports.Model = sequalizeModel;

//# sourceMappingURL=../../../source-maps/modules/feature modules/models/module-instances-model.js.map
