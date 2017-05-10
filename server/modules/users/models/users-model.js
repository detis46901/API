"use strict";
var dbConnection = require('../../../core/db-connection');
var Sequelize = require('sequelize');
var db = dbConnection();
var sequalizeModel = db.define('user', {
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 200]
        }
    },
    roleID: {
        type: Sequelize.INTEGER,
        validate: {
            min: 1
        }
    },
    active: {
        type: Sequelize.BOOLEAN,
        validate: {
            is: ["[a-z]", 'i'] //only allow letters
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 200]
        }
    },
    administrator: {
        type: Sequelize.BOOLEAN,
        validate: {
            is: ["[a-z]", 'i']
        }
    }
});
sequalizeModel.sync();
exports.Model = sequalizeModel;

//# sourceMappingURL=../../../source-maps/modules/users/models/users-model.js.map
