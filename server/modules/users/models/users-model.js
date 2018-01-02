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
var flag = 0;
sequalizeModel.findAll({}).then(function (result) {
    if (result == null)
        flag = 1; //Create default user if there isn't one yet
});
if (flag == 1) {
    sequalizeModel.create({
        firstName: 'John',
        lastName: 'Doe',
        password: 'c8108df8eaad2bf5004850ab32c9fa23',
        roleID: 1,
        active: false,
        email: 'john.doe@email.com',
        administrator: true
    });
}
sequalizeModel.sync();
exports.Model = sequalizeModel;

//# sourceMappingURL=../../../source-maps/modules/users/models/users-model.js.map
