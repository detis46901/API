import dbConnection = require('../../../core/db-connection');
import ModulesModel = require('./module-model');
import { Model, DataTypes } from "sequelize";

var db = dbConnection();

export interface ModuleInstancesInstance extends Model<ModuleInstancesInstance, App.ModuleInstances>, App.ModuleInstances { }
export interface ModuleModel extends Model<ModuleInstancesInstance, App.ModuleInstances> { }


var sequalizeModel = db.define<ModuleInstancesInstance, App.ModuleInstances>('module_instance', <any>{
    ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 30]
        }
    },
    description: {
       type: DataTypes.STRING,
       allowNull: false
   },
   settings: {
       type: DataTypes.JSON}
});

sequalizeModel.belongsTo(ModulesModel.model)
sequalizeModel.sync()

export var model = sequalizeModel;