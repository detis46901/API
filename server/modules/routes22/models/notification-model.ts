import dbConnection = require('../../../core/db-connection');
import { Model, DataTypes } from "sequelize";
import UserModel = require('./user-model');

var db = dbConnection();

export interface NotificationInstance extends Model<NotificationInstance, App.Notification>, App.Notification { }
export interface NotificationModel extends Model<NotificationInstance, App.Notification> { }

var sequalizeModel = db.define<NotificationInstance, App.Notification>('notification', <any>{
    ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    link: {
        type: DataTypes.STRING,
        allowNull: true
    }, 
    priority: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    read: {
        type: DataTypes.BOOLEAN,
        required: true
    },
    objectType: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sourceID: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});

sequalizeModel.belongsTo(UserModel.model)
sequalizeModel.sync() 
export var model = sequalizeModel;