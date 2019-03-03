"use strict";
var dbConnection = require('../../../core/db-connection');
var Sequelize = require('sequelize');
var db = dbConnection();
var sequalizeModel = db.define('module', {
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    identity: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 30]
        }
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 30]
        }
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 200]
        }
    },
    defaultInstanceSettings: {
        type: Sequelize.JSON,
        allowNull: true
    },
    defaultUserSettings: {
        type: Sequelize.JSON,
        allowNull: true
    }
});
sequalizeModel.sync();
exports.Model = sequalizeModel;

//# sourceMappingURL=../../../source-maps/modules/feature modules/models/module-model.js.map
