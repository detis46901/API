import dbConnection = require('../../../core/db-connection');
import { Model, DataTypes } from "sequelize";

var db = dbConnection();


export interface ModuleInstance extends Model<ModuleInstance, App.Module>, App.Module { }
export interface ModuleModel extends Model<ModuleInstance, App.Module> { }


var sequalizeModel = db.define<ModuleInstance, App.Module>('module', <any>{
    ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    identity: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 30]
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 30]
        }
    },
    description: {
       type: DataTypes.STRING,
       allowNull: false,
       validate: {
           len: [1, 200]
       }
   },
   defaultInstanceSettings: {
       type: DataTypes.JSON,
       allowNull: true
   },
   defaultUserSettings: {
       type: DataTypes.JSON,
       allowNull: true
   }
});

sequalizeModel.sync()

export var model = sequalizeModel;