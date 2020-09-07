import dbConnection = require('../../../core/db-connection');
import PageModel = require('../../users/models/page-model');
import LayerModel = require ('./layers-model');
import UserModel = require('../../users/models/user-model');
import UserPageInstanceModel = require('../../feature modules/models/user-page-instance-model')
import { Model, DataTypes } from "sequelize";

var db = dbConnection();

export interface UserPageLayerInstance extends Model<UserPageLayerInstance, App.UserPageLayer>, App.UserPageLayer { }
export interface UserPageLayerModel extends Model<UserPageLayerInstance, App.UserPageLayer> { }

var sequalizeModel = db.define<UserPageLayerInstance, App.UserPageLayer>('user_page_layer', <any>{
    ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    defaultON: {
        type: DataTypes.BOOLEAN},
    layerOrder: {
        type: DataTypes.INTEGER},
    style: {
        type: DataTypes.JSON}
});

sequalizeModel.belongsTo(UserModel.model)
sequalizeModel.belongsTo(PageModel.model)
sequalizeModel.belongsTo(LayerModel.model)
sequalizeModel.belongsTo(UserPageInstanceModel.model)
sequalizeModel.sync(); 

export var model = sequalizeModel;