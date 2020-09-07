import dbConnection = require('../../../core/db-connection');
var ServerModel = require('./servers-model');
var DomainModel = require('../../domain/models/domain-model')
import { Model, DataTypes } from "sequelize";

var db = dbConnection();


export interface LayerInstance extends Model<LayerInstance, App.Layer>, App.Layer { }
export interface LayerModel extends Model<LayerInstance, App.Layer> { }


var sequalizeModel = db.define<LayerInstance, App.Layer>('layer', <any>{
    ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    layerName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 30]
        }
    },
    layerType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 30]
        }
    },
    layerService: {
       type: DataTypes.STRING,
       allowNull: false,
       validate: {
           len: [1, 200]
       }
   },
   layerIdent: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          len: [1, 200]
      }
  },
     layerFormat: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 200]
        }
    },
    layerDescription: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    layerGeom: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [1, 200]
        }
    },
    defaultStyle: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: '{"load":{"color":"#000000","width":2},"current":{"color":"#000000","width":4}}'
    }
});



sequalizeModel.belongsTo(ServerModel.model);
sequalizeModel.belongsTo(DomainModel.model);
sequalizeModel.sync()

export var model = sequalizeModel;