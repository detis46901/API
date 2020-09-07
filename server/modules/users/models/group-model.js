"use strict";
var dbConnection = require('../../../core/db-connection');
var sequelize_1 = require("sequelize");
var db = dbConnection();
var sequalizeModel = db.define('group', {
    ID: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        validate: {
            is: ["[a-z]", 'i'] //only allow letters
        }
    }
});
var flag = 0;
sequalizeModel.findAll({}).then(function (result) {
    if (result == null)
        flag = 1; //Create default group if there isn't one yet
});
sequalizeModel.sync();
exports.model = sequalizeModel;

//# sourceMappingURL=../../../source-maps/modules/users/models/group-model.js.map
