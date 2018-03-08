"use strict";
var dbConnection = require('../../../core/db-connection');
var Sequelize = require('sequelize');
var UserModel = require('./user-model');
var db = dbConnection();
var sequalizeModel = db.define('notification', {
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    link: {
        type: Sequelize.STRING,
        allowNull: true
    },
    priority: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    read: {
        type: Sequelize.BOOLEAN,
        required: true
    },
    objectType: {
        type: Sequelize.STRING,
        allowNull: true
    },
    sourceID: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
});
sequalizeModel.belongsTo(UserModel.Model);
sequalizeModel.sync();
exports.Model = sequalizeModel;

//# sourceMappingURL=../../../source-maps/modules/users/models/notification-model.js.map
