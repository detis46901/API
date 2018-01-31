import dbConnection = require('../../../core/db-connection');
import Sequelize = require('sequelize');
var ServerModel = require('./servers-model');

var db = dbConnection();


export interface LayerInstance extends Sequelize.Instance<LayerInstance, App.Layer>, App.Layer { }
export interface LayerModel extends Sequelize.Model<LayerInstance, App.Layer> { }


var sequalizeModel = db.define<LayerInstance, App.Layer>('layer', <any>{
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    layerName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 30]
        }
    },
    layerType: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 30]
        }
    },
    layerService: {
       type: Sequelize.STRING,
       allowNull: false,
       validate: {
           len: [1, 200]
       }
   },
   layerIdent: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
          len: [1, 200]
      }
  },
  
     layerFormat: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 200]
        }
    },
    layerDescription: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            len: [1, 200]
        }
    },
    layerGeom: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            len: [1, 200]
        }
    }
});



sequalizeModel.belongsTo(ServerModel.Model);
sequalizeModel.sync()

export var Model = sequalizeModel;