import dbConnection = require('../../../core/db-connection');
import Sequelize = require('sequelize');
import UserModel = require('../../users/models/user-model');
import ModuleInstance = require('./module-instances-model')
import GroupModel = require('../../users/models/group-model');


var db = dbConnection();


export interface ModulePermissionInstance extends Sequelize.Instance<ModulePermissionInstance, App.ModulePermission>, App.ModulePermission { }


var sequalizeModel = db.define<ModulePermissionInstance, App.ModulePermission>('module_permission', <any>{
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
    },
    settings: {
        allowNull: true,
        type: Sequelize.JSON
    }
});

sequalizeModel.belongsTo(UserModel.Model);
sequalizeModel.belongsTo(ModuleInstance.Model)
sequalizeModel.belongsTo(GroupModel.Model)


sequalizeModel.sync()

export var Model = sequalizeModel;