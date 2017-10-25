"use strict";
var dbConnection = require('../../../core/db-connection');
var Sequelize = require('sequelize');
var db = dbConnection();
var sequalizeModel = db.define('department', {
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    department: {
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
var flag = 0;
sequalizeModel.findAll({}).then(function (result) {
    if (result == null)
        flag = 1; //Create default department if there isn't one yet
});
if (flag == 1) {
    sequalizeModel.create({
        department: 'Engineering',
        active: true
    });
}
sequalizeModel.sync();
exports.Model = sequalizeModel;

//# sourceMappingURL=../../../source-maps/modules/users/models/department-model.js.map
