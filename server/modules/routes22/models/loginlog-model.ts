import dbConnection = require('../../../core/db-connection');
import GroupMemberModel = require('./group-member-model');
import { Model, DataTypes } from "sequelize";


var db = dbConnection();

export interface LoginLogInstance extends Model<LoginLogInstance, App.LoginLog>, App.LoginLog { }

var loginLogModel = db.define<LoginLogInstance, App.LoginLog>('loginlog', <any>{
    ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            len: [0, 100]
        }
    },
    result: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    }
});

loginLogModel.sync() 

export var model = loginLogModel;