import dbConnection = require('../../../core/db-connection');
import Sequelize = require('sequelize');
import GroupModel = require('./group-model');
import UserModel = require('./users-model');

var db = dbConnection();

export interface GroupMembersInstance extends Sequelize.Instance<GroupMembersInstance, App.GroupMembers>, App.GroupMembers { }
export interface GroupMembersModel extends Sequelize.Model<GroupMembersInstance, App.GroupMembers> { }


var sequalizeModel = db.define<GroupMembersInstance, App.GroupMembers>('group_members', <any>{
    ID: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

sequalizeModel.belongsTo(GroupModel.Model);
sequalizeModel.belongsTo(UserModel.Model);

var flag = 0;

sequalizeModel.sync({force:true})    
export var Model = sequalizeModel;