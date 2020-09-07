import dbConnection = require('../../../core/db-connection');
import Sequelize = require('sequelize');
import PageModel = require('../../users/models/page-model');
import ModuleInstanceModel = require ('./module-instances-model');
import UserModel = require('../../users/models/user-model');
import { Model, DataTypes } from "sequelize";

var db = dbConnection();

export interface UserPageInstanceInstance extends Model<UserPageInstanceInstance, App.UserPageInstance>, App.UserPageInstance { }
export interface UserPageInstanceModel extends Model<UserPageInstanceInstance, App.UserPageInstance> { }


var sequalizeModel = db.define<UserPageInstanceInstance, App.UserPageInstance>('user_page_instance', <any>{
    ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    defaultON: {
        type: DataTypes.BOOLEAN},
    instanceOrder: {
        type: DataTypes.INTEGER}
});

sequalizeModel.belongsTo(UserModel.model)
sequalizeModel.belongsTo(PageModel.model)
sequalizeModel.belongsTo(ModuleInstanceModel.model)
sequalizeModel.sync(); 

export var model = sequalizeModel;