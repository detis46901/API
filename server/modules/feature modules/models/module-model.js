"use strict";
var dbConnection = require('../../../core/db-connection');
var sequelize_1 = require("sequelize");
var db = dbConnection();
var sequalizeModel = db.define('module', {
    ID: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    identity: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 30]
        }
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 30]
        }
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 200]
        }
    },
    defaultInstanceSettings: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true
    },
    defaultUserSettings: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true
    }
});
sequalizeModel.sync();
exports.model = sequalizeModel;

//# sourceMappingURL=../../../source-maps/modules/feature modules/models/module-model.js.map
