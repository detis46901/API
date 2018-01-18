"use strict";
var dbConnection = require('../../../core/db-connection');
var Sequelize = require('sequelize');
var db = dbConnection();
var sequalizeModel = db.define('group', {
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },
    description: {
        type: Sequelize.STRING,
        validate: {
            is: ["[a-z]", 'i'] //only allow letters
        }
    }
});
//sequalizeModel.belongsTo(DepartmentModel.Model)
var flag = 0;
sequalizeModel.findAll({}).then(function (result) {
    if (result == null)
        flag = 1; //Create default group if there isn't one yet
});
//sequalizeModel.hasOne(GroupMemberModel.Model)
sequalizeModel.sync();
exports.Model = sequalizeModel;

//# sourceMappingURL=../../../source-maps/modules/users/models/group-model.js.map
