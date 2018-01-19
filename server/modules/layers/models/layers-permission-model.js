"use strict";
var dbConnection = require('../../../core/db-connection');
var Sequelize = require('sequelize');
var UserModel = require('../../users/models/user-model');
var GroupModel = require('../../users/models/group-model');
var LayerAdminModel = require('./layers-admin-model');
var db = dbConnection();
var sequalizeModel = db.define('layer_permission', {
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
sequalizeModel.belongsTo(LayerAdminModel.Model);
sequalizeModel.belongsTo(GroupModel.Model);
//sequalizeModel.sync({force:true});
sequalizeModel.sync();
exports.Model = sequalizeModel;

//# sourceMappingURL=../../../source-maps/modules/layers/models/layers-permission-model.js.map
