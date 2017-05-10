"use strict";
var dbConnection = require('../../../core/db-connection');
var Sequelize = require('sequelize');
var DepartmentModel = require('./department-model');
var db = dbConnection();
var sequalizeModel = db.define('group', {
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    group: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },
    active: {
        type: Sequelize.BOOLEAN,
        validate: {
            is: ["[a-z]", 'i'] //only allow letters
        }
    }
});
sequalizeModel.belongsTo(DepartmentModel.Model);
sequalizeModel.sync();
exports.Model = sequalizeModel;

//# sourceMappingURL=../../../source-maps/modules/users/models/group-model.js.map
