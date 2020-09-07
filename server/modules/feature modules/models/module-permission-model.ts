import dbConnection = require('../../../core/db-connection');
import UserModel = require('../../users/models/user-model');
import ModuleInstance = require('./module-instances-model')
import GroupModel = require('../../users/models/group-model');
import { Model, DataTypes } from "sequelize";

var db = dbConnection();

export interface ModulePermissionInstance extends Model<ModulePermissionInstance, App.ModulePermission>, App.ModulePermission { }

var sequalizeModel = db.define<ModulePermissionInstance, App.ModulePermission>('module_permission', <any>{
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
    },
    settings: {
        allowNull: true,
        type: DataTypes.JSON
    }
});

sequalizeModel.belongsTo(UserModel.model);
sequalizeModel.belongsTo(ModuleInstance.model)
sequalizeModel.belongsTo(GroupModel.model)

sequalizeModel.sync()

export var model = sequalizeModel;