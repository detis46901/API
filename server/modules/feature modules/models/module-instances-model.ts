import dbConnection = require('../../../core/db-connection');
import ModulesModel = require('./module-model');
import Sequelize = require('sequelize');

var db = dbConnection();


export interface ModuleInstancesInstance extends Sequelize.Instance<ModuleInstancesInstance, App.ModuleInstances>, App.ModuleInstances { }
export interface ModuleModel extends Sequelize.Model<ModuleInstancesInstance, App.ModuleInstances> { }


var sequalizeModel = db.define<ModuleInstancesInstance, App.ModuleInstances>('module_instance', <any>{
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 30]
        }
    },
    description: {
       type: Sequelize.STRING,
       allowNull: false
   },
   settings: {
       type: Sequelize.JSON}
});

sequalizeModel.belongsTo(ModulesModel.Model)
sequalizeModel.sync()

export var Model = sequalizeModel;