import dbConnection = require('../../../core/db-connection');
import userModel = require('../../users/models/user-model')
import { Model, DataTypes } from "sequelize";

var db = dbConnection();

export interface LoginLogInstance extends Model<LoginLogInstance, App.LoginLog>, App.LoginLog { }
export interface LoginLogModel extends Model<LoginLogInstance, App.LoginLog> { }

var sequalizeModel = db.define<LoginLogInstance, App.LoginLog>('loginlog', <any>{
    ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    result: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    }
});

sequalizeModel.sync() 

export var model = sequalizeModel;