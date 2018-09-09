import dbConnection = require('../../../core/db-connection');
import Sequelize = require('sequelize');
import UserModel = require('../../users/models/user-model');
import GroupModel = require('../../users/models/group-model');
import LayerModel = require('./layers-model');

var db = dbConnection();

export interface LayerPermissionInstance extends Sequelize.Instance<LayerPermissionInstance, App.LayerPermission>, App.LayerPermission { }
export interface LayerPermissionModel extends Sequelize.Model<LayerPermissionInstance, App.LayerPermission> { }


var sequalizeModel = db.define<LayerPermissionInstance, App.LayerPermission>('layer_permission', <any>{
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    edit: {
        allowNull: false,
        type: Sequelize.BOOLEAN
    },
    delete: {
        allowNull: false,
        type: Sequelize.BOOLEAN
    },
    owner: {
        allowNull: false,
        type: Sequelize.BOOLEAN
    },
    canGrant: {
        allowNull: false,
        type: Sequelize.BOOLEAN
    },
    grantedBy: {
        allowNull: true,
        type: Sequelize.INTEGER
    },
    comments: {
        allowNull: true,
        type: Sequelize.STRING
    }
});

sequalizeModel.belongsTo(UserModel.Model);
sequalizeModel.belongsTo(LayerModel.Model);
sequalizeModel.belongsTo(GroupModel.Model)

//sequalizeModel.sync({force:true});
sequalizeModel.sync();

export var Model = sequalizeModel;