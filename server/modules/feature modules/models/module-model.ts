import dbConnection = require('../../../core/db-connection');
import Sequelize = require('sequelize');

var db = dbConnection();


export interface ModuleInstance extends Sequelize.Instance<ModuleInstance, App.Module>, App.Module { }
export interface ModuleModel extends Sequelize.Model<ModuleInstance, App.Module> { }


var sequalizeModel = db.define<ModuleInstance, App.Module>('module', <any>{
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    identity: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 30]
        }
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 30]
        }
    },
    description: {
       type: Sequelize.STRING,
       allowNull: false,
       validate: {
           len: [1, 200]
       }
   },
   defaultInstanceSettings: {
       type: Sequelize.JSON,
       allowNull: true
   },
   defaultUserSettings: {
       type: Sequelize.JSON,
       allowNull: true
   }
});

sequalizeModel.sync()

export var Model = sequalizeModel;