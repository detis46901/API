"use strict";
var dbConnection = require('../../../core/db-connection');
var GroupModel = require('./group-model');
var UserModel = require('./user-model');
var sequelize_1 = require("sequelize");
var db = dbConnection();
var sequalizeModel = db.define('group_member', {
    ID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});
sequalizeModel.belongsTo(GroupModel.model);
sequalizeModel.belongsTo(UserModel.model);
// sequalizeModel.create({
//     ID: 1,
//     groupID: 1,
//     userID: 102
// })
sequalizeModel.sync();
exports.model = sequalizeModel;

//# sourceMappingURL=../../../source-maps/modules/users/models/group-member-model.js.map
