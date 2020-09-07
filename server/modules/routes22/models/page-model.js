"use strict";
var dbConnection = require('../../../core/db-connection');
// import Sequelize = require('sequelize');
var sequelize_1 = require("sequelize");
var UserModel = require('../../users/models/user-model');
var db = dbConnection();
var sequalizeModel = db.define('user_page', {
    ID: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    page: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 200]
        }
    },
    pageOrder: {
        type: sequelize_1.DataTypes.INTEGER,
        validate: {
            min: 0
        }
    },
    default: {
        type: sequelize_1.DataTypes.BOOLEAN,
        validate: {
            is: ["[a-z]", 'i'] //only allow letters
        }
    },
    active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        validate: {
            is: ["[a-z]", 'i'] //only allow letters
        }
    },
});
sequalizeModel.belongsTo(UserModel.model);
sequalizeModel.sync();
exports.model = sequalizeModel;

//# sourceMappingURL=../../../source-maps/modules/routes22/models/page-model.js.map
