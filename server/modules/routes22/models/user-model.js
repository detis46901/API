"use strict";
var dbConnection = require('../../../core/db-connection');
var sequelize_1 = require("sequelize");
var db = dbConnection();
var bcrypt = require('bcrypt');
var sequalizeModel = db.define('user', {
    ID: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 200]
        }
    },
    active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        validate: {
            is: ["[a-z]", 'i'] //only allow letters //1/3/18 why is this here? letter validation for a boolean type?
        }
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        required: true,
        unique: true,
        validate: {
            len: [1, 200],
            isEmail: true
        }
    },
    administrator: {
        type: sequelize_1.DataTypes.BOOLEAN,
        validate: {
            is: ["[a-z]", 'i'] //1/3/18^^^
        }
    },
    public: {
        type: sequelize_1.DataTypes.BOOLEAN,
        validate: {
            is: ["[a-z]", 'i'] //1/3/18^^^
        }
    }
});
sequalizeModel.sync();
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
exports.model = sequalizeModel;

//# sourceMappingURL=../../../source-maps/modules/routes22/models/user-model.js.map
