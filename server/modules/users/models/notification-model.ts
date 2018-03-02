import dbConnection = require('../../../core/db-connection');
import Sequelize = require('sequelize');
import UserModel = require('./user-model');

var db = dbConnection();


export interface NotificationInstance extends Sequelize.Instance<NotificationInstance, App.Notification>, App.Notification { }
export interface NotificationModel extends Sequelize.Model<NotificationInstance, App.Notification> { }


var sequalizeModel = db.define<NotificationInstance, App.Notification>('notification', <any>{
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    link: {
        type: Sequelize.STRING,
        allowNull: true
    }, 
    priority: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    read: {
        type: Sequelize.BOOLEAN,
        required: true,
    }
});

sequalizeModel.belongsTo(UserModel.Model)
sequalizeModel.sync() 
export var Model = sequalizeModel;