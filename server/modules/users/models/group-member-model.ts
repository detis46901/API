import dbConnection = require('../../../core/db-connection');
import Sequelize = require('sequelize');
import GroupModel = require('./group-model');
import UserModel = require('./user-model');

var db = dbConnection();

export interface GroupMemberInstance extends Sequelize.Instance<GroupMemberInstance, App.GroupMember>, App.GroupMember { }
export interface GroupMemberModel extends Sequelize.Model<GroupMemberInstance, App.GroupMember> { }


var sequalizeModel = db.define<GroupMemberInstance, App.GroupMember>('group_member', <any>{
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

sequalizeModel.belongsTo(GroupModel.Model);
sequalizeModel.belongsTo(UserModel.Model);

// sequalizeModel.create({
//     ID: 1,
//     groupID: 1,
//     userID: 102
// })

sequalizeModel.sync()
//sequalizeModel.sync()
export var Model = sequalizeModel;