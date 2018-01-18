"use strict";
var dbConnection = require('../../../core/db-connection');
var Sequelize = require('sequelize');
var GroupModel = require('./group-model');
var UserModel = require('./user-model');
var db = dbConnection();
var sequalizeModel = db.define('group_member', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});
console.log("\n\n" + sequalizeModel + "\n\n");
sequalizeModel.belongsTo(GroupModel.Model);
sequalizeModel.belongsTo(UserModel.Model);
// sequalizeModel.create({
//     ID: 1,
//     groupID: 1,
//     userID: 102
// })
sequalizeModel.sync();
//sequalizeModel.sync()
exports.Model = sequalizeModel;

//# sourceMappingURL=../../../source-maps/modules/users/models/group-member-model.js.map
