"use strict";
var dbConnection = require('../../../core/db-connection');
var Sequelize = require('sequelize');
var db = dbConnection();
var sequalizeModel = db.define('user_page', {
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    userID: {
        type: Sequelize.INTEGER,
        validate: {
            min: 1
        }
    },
    page: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 200]
        }
    },
    pageOrder: {
        type: Sequelize.INTEGER,
        validate: {
            min: 0
        }
    },
    default: {
        type: Sequelize.BOOLEAN,
        validate: {
            is: ["[a-z]", 'i'] //only allow letters
        }
    },
    active: {
        type: Sequelize.BOOLEAN,
        validate: {
            is: ["[a-z]", 'i'] //only allow letters
        }
    },
});
sequalizeModel.sync();
exports.Model = sequalizeModel;

//# sourceMappingURL=../../../source-maps/modules/users/models/page-model.js.map
