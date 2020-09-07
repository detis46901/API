"use strict";
var dbConnection = require('../../../core/db-connection');
var UserModel = require('../../users/models/user-model');
var GroupModel = require('../../users/models/group-model');
var LayerModel = require('./layers-model');
var sequelize_1 = require("sequelize");
var db = dbConnection();
var sequalizeModel = db.define('layer_permission', {
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
    }
});
sequalizeModel.belongsTo(UserModel.model);
sequalizeModel.belongsTo(LayerModel.model);
sequalizeModel.belongsTo(GroupModel.model);
//sequalizeModel.sync({force:true});
sequalizeModel.sync();
exports.model = sequalizeModel;

//# sourceMappingURL=../../../source-maps/modules/layers/models/layers-permission-model.js.map
