"use strict";
var dbConnection = require('../../../core/db-connection');
var Sequelize = require('sequelize');
var db = dbConnection();
var sequelizeModel = db.define('domain', {
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },
    centerlong: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    centerlat: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    centerzoom: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        default: 13
    },
    bingmapskey: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },
    mapboxbasemapurl: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },
    localz: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },
    cacheSize: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 13
    }
});
sequelizeModel.sync();
exports.Model = sequelizeModel;

//# sourceMappingURL=../../../source-maps/modules/domain/models/domain-model.js.map
