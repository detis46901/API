import dbConnection = require('../../../core/db-connection');
import Sequelize = require('sequelize');
import UserModel = require('../../users/models/user-model');
import LayerAdminModel = require('./layers-admin-model');

var db = dbConnection();


export interface LayerPermissionInstance extends Sequelize.Instance<LayerPermissionInstance, App.LayerPermission>, App.LayerPermission { }
export interface LayerPermissionModel extends Sequelize.Model<LayerPermissionInstance, App.LayerPermission> { }


var sequalizeModel = db.define<LayerPermissionInstance, App.LayerPermission>('layer_permission', <any>{
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    edit: {
        type: Sequelize.BOOLEAN,
    }
});

sequalizeModel.belongsTo(UserModel.Model);
sequalizeModel.belongsTo(LayerAdminModel.Model);
sequalizeModel.sync(); 

export var Model = sequalizeModel;