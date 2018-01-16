"use strict";
var dbConnection = require('../../../core/db-connection');
var Sequelize = require('sequelize');
var GroupModel = require('./group-model');
var UserModel = require('./users-model');
var db = dbConnection();
var sequalizeModel = db.define('group_members', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});
sequalizeModel.belongsTo(GroupModel.Model);
sequalizeModel.belongsTo(UserModel.Model);
var flag = 0;
sequalizeModel.sync({ force: true });
exports.Model = sequalizeModel;

//# sourceMappingURL=../../../source-maps/modules/users/models/group-members-model.js.map
