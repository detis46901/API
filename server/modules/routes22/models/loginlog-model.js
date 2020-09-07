"use strict";
var dbConnection = require('../../../core/db-connection');
var sequelize_1 = require("sequelize");
var db = dbConnection();
var loginLogModel = db.define('loginlog', {
    ID: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            len: [0, 100]
        }
    },
    result: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    }
});
loginLogModel.sync();
exports.model = loginLogModel;

//# sourceMappingURL=../../../source-maps/modules/routes22/models/loginlog-model.js.map
