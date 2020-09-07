"use strict";
var dbConnection = require('../../../core/db-connection');
var sequelize_1 = require("sequelize");
var db = dbConnection();
var sequelizeModel = db.define('domain', {
    ID: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },
    url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },
    centerlong: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    },
    centerlat: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    },
    centerzoom: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
        default: 13
    },
    bingmapskey: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },
    mapboxbasemapurl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },
    localz: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },
    cacheSize: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        default: 13
    }
});
sequelizeModel.sync();
exports.model = sequelizeModel;

//# sourceMappingURL=../../../source-maps/modules/domain/models/domain-model.js.map
