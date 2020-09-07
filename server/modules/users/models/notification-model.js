"use strict";
var dbConnection = require('../../../core/db-connection');
var UserModel = require('./user-model');
var sequelize_1 = require("sequelize");
var db = dbConnection();
var sequalizeModel = db.define('notification', {
    ID: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    link: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    priority: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    read: {
        type: sequelize_1.DataTypes.BOOLEAN,
        required: true
    },
    objectType: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    sourceID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    }
});
sequalizeModel.belongsTo(UserModel.model);
sequalizeModel.sync();
exports.model = sequalizeModel;

//# sourceMappingURL=../../../source-maps/modules/users/models/notification-model.js.map
