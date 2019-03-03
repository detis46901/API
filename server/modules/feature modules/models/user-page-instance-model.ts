import dbConnection = require('../../../core/db-connection');
import Sequelize = require('sequelize');
import PageModel = require('../../users/models/page-model');
import ModuleInstanceModel = require ('./module-instances-model');
import UserModel = require('../../users/models/user-model');

var db = dbConnection();


export interface UserPageInstanceInstance extends Sequelize.Instance<UserPageInstanceInstance, App.UserPageInstance>, App.UserPageInstance { }
export interface UserPageInstanceModel extends Sequelize.Model<UserPageInstanceInstance, App.UserPageInstance> { }


var sequalizeModel = db.define<UserPageInstanceInstance, App.UserPageInstance>('user_page_instance', <any>{
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    defaultON: {
        type: Sequelize.BOOLEAN},
    instanceOrder: {
        type: Sequelize.INTEGER}
});

sequalizeModel.belongsTo(UserModel.Model)
sequalizeModel.belongsTo(PageModel.Model)
sequalizeModel.belongsTo(ModuleInstanceModel.Model)
sequalizeModel.sync(); 

export var Model = sequalizeModel;