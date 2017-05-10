"use strict";
var dbConnection = require('../../../core/db-connection');
var Sequelize = require('sequelize');
var LayerAdminModel = require('./layers-admin-model');
var db = dbConnection();
var sequalizeModel = db.define('layer_permission', {
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    userID: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    edit: {
        type: Sequelize.BOOLEAN,
    }
});
sequalizeModel.belongsTo(LayerAdminModel.Model);
sequalizeModel.sync();
exports.Model = sequalizeModel;

//# sourceMappingURL=../../../source-maps/modules/layers/models/layers-permission-model.js.map
