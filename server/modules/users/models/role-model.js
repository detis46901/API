"use strict";
var dbConnection = require('../../../core/db-connection');
var Sequelize = require('sequelize');
var GroupModel = require('../models/group-model');
var db = dbConnection();
var sequalizeModel = db.define('role', {
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    role: {
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
        flag = 1; //Create default group if there isn't one yet
});
if (flag == 1) {
    sequalizeModel.create({
        groupID: 1,
        role: 'Engineer',
        active: true
    });
}
sequalizeModel.belongsTo(GroupModel.Model);
sequalizeModel.sync();
exports.Model = sequalizeModel;

//# sourceMappingURL=../../../source-maps/modules/users/models/role-model.js.map
