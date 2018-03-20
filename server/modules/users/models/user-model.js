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
    active: {
        type: Sequelize.BOOLEAN,
        validate: {
            is: ["[a-z]", 'i'] //only allow letters //1/3/18 why is this here? letter validation for a boolean type?
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
        unique: true,
        validate: {
            len: [1, 200],
            isEmail: true
        }
    },
    administrator: {
        type: Sequelize.BOOLEAN,
        validate: {
            is: ["[a-z]", 'i'] //1/3/18^^^
        }
    }
});
//console.log("\n\n"+sequalizeModel+"\n\n")
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
        active: false,
        email: 'john.doe@email.com',
        administrator: true
    });
}
//sequalizeModel.hasOne(GroupMemberModel.Model)
sequalizeModel.sync();
exports.Model = sequalizeModel;

//# sourceMappingURL=../../../source-maps/modules/users/models/user-model.js.map
