import dbConnection = require('../../../core/db-connection');
import Sequelize = require('sequelize');
import sequelize = require('sequelize');
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
        type: sequelize.TEXT,
        allowNull: true
    },
    layerGeom: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            len: [1, 200]
        }
    },
    defaultStyle: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: '{"load":{"color":"#000000","width":2},"current":{"color":"#000000","width":4}}'
    }
});



sequalizeModel.belongsTo(ServerModel.Model);
sequalizeModel.sync()

export var Model = sequalizeModel;