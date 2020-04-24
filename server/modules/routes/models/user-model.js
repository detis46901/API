"use strict";
var dbConnection = require('../../../core/db-connection');
var Sequelize = require('sequelize');
var db = dbConnection();
var bcrypt = require('bcrypt');
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
    },
    public: {
        type: Sequelize.BOOLEAN,
        validate: {
            is: ["[a-z]", 'i'] //1/3/18^^^
        }
    }
});
sequalizeModel.sync();
var flag = 0;
sequalizeModel.findAll({}).then(function (result) {
    if (!result[0]) {
        var pw;
        bcrypt.hash("admin", 10, function (err, hash) {
            pw = hash;
            sequalizeModel.create({
                firstName: 'Generic',
                lastName: 'Administrator',
                password: pw,
                active: false,
                email: 'administrator@gmail.com',
                administrator: true
            });
        });
    }
});
exports.Model = sequalizeModel;

//# sourceMappingURL=../../../source-maps/modules/routes/models/user-model.js.map
