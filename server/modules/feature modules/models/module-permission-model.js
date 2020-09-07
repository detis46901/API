"use strict";
var dbConnection = require('../../../core/db-connection');
var UserModel = require('../../users/models/user-model');
var ModuleInstance = require('./module-instances-model');
var GroupModel = require('../../users/models/group-model');
var sequelize_1 = require("sequelize");
var db = dbConnection();
var sequalizeModel = db.define('module_permission', {
    ID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    edit: {
        allowNull: false,
        type: sequelize_1.DataTypes.BOOLEAN
    },
    delete: {
        allowNull: false,
        type: sequelize_1.DataTypes.BOOLEAN
    },
    owner: {
        allowNull: false,
        type: sequelize_1.DataTypes.BOOLEAN
    },
    canGrant: {
        allowNull: false,
        type: sequelize_1.DataTypes.BOOLEAN
    },
    grantedBy: {
        allowNull: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    comments: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING
    },
    settings: {
        allowNull: true,
        type: sequelize_1.DataTypes.JSON
    }
});
sequalizeModel.belongsTo(UserModel.model);
sequalizeModel.belongsTo(ModuleInstance.model);
sequalizeModel.belongsTo(GroupModel.model);
sequalizeModel.sync();
exports.model = sequalizeModel;

//# sourceMappingURL=../../../source-maps/modules/feature modules/models/module-permission-model.js.map
