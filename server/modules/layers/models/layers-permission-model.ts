import dbConnection = require('../../../core/db-connection');
import UserModel = require('../../users/models/user-model');
import GroupModel = require('../../users/models/group-model');
import LayerModel = require('./layers-model');
import { Model, DataTypes } from "sequelize";

var db = dbConnection();

export interface LayerPermissionInstance extends Model<LayerPermissionInstance, App.LayerPermission>, App.LayerPermission { }
export interface LayerPermissionModel extends Model<LayerPermissionInstance, App.LayerPermission> { }

var sequalizeModel = db.define<LayerPermissionInstance, App.LayerPermission>('layer_permission', <any>{
    ID: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    edit: {
        allowNull: false,
        type: DataTypes.BOOLEAN
    },
    delete: {
        allowNull: false,
        type: DataTypes.BOOLEAN
    },
    owner: {
        allowNull: false,
        type: DataTypes.BOOLEAN
    },
    canGrant: {
        allowNull: false,
        type: DataTypes.BOOLEAN
    },
    grantedBy: {
        allowNull: true,
        type: DataTypes.INTEGER
    },
    comments: {
        allowNull: true,
        type: DataTypes.STRING
    }
});

sequalizeModel.belongsTo(UserModel.model);
sequalizeModel.belongsTo(LayerModel.model);
sequalizeModel.belongsTo(GroupModel.model)

//sequalizeModel.sync({force:true});
sequalizeModel.sync();

export var model = sequalizeModel;