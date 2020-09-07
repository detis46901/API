import dbConnection = require('../../../core/db-connection');
import GroupModel = require('./group-model');
import UserModel = require('./user-model');
import { Model, DataTypes } from "sequelize";


var db = dbConnection();

export interface GroupMemberInstance extends Model<GroupMemberInstance, App.GroupMember>, App.GroupMember { }
export interface GroupMemberModel extends Model<GroupMemberInstance, App.GroupMember> { }


var sequalizeModel = db.define<GroupMemberInstance, App.GroupMember>('group_member', <any>{
    ID: { 
        type: DataTypes.INTEGER,
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

sequalizeModel.sync()    
export var model = sequalizeModel;