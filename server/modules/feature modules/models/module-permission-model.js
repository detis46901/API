"use strict";
var dbConnection = require('../../../core/db-connection');
var Sequelize = require('sequelize');
var UserModel = require('../../users/models/user-model');
var ModuleInstance = require('./module-instances-model');
var GroupModel = require('../../users/models/group-model');
var db = dbConnection();
var sequalizeModel = db.define('module_permission', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    edit: {
        allowNull: false,
        type: Sequelize.BOOLEAN
    },
    delete: {
        allowNull: false,
        type: Sequelize.BOOLEAN
    },
    owner: {
        allowNull: false,
        type: Sequelize.BOOLEAN
    },
    canGrant: {
        allowNull: false,
        type: Sequelize.BOOLEAN
    },
    grantedBy: {
        allowNull: true,
        type: Sequelize.INTEGER
    },
    comments: {
        allowNull: true,
        type: Sequelize.STRING
    }
});
sequalizeModel.belongsTo(UserModel.Model);
sequalizeModel.belongsTo(ModuleInstance.Model);
sequalizeModel.belongsTo(GroupModel.Model);
sequalizeModel.sync();
exports.Model = sequalizeModel;

//# sourceMappingURL=../../../source-maps/modules/feature modules/models/module-permission-model.js.map
