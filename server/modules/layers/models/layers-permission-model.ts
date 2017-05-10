import dbConnection = require('../../../core/db-connection');
import Sequelize = require('sequelize');
var LayerAdminModel = require('./layers-admin-model');

var db = dbConnection();


export interface LayerPermissionInstance extends Sequelize.Instance<LayerPermissionInstance, App.LayerPermission>, App.LayerPermission { }
export interface LayerPermissionModel extends Sequelize.Model<LayerPermissionInstance, App.LayerPermission> { }


var sequalizeModel = db.define<LayerPermissionInstance, App.LayerPermission>('layer_permission', <any>{
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    userID: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    edit: {
        type: Sequelize.BOOLEAN,
    }
});

sequalizeModel.belongsTo(LayerAdminModel.Model);
sequalizeModel.sync(); 

export var Model = sequalizeModel;