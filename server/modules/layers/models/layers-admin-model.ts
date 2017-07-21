import dbConnection = require('../../../core/db-connection');
import Sequelize = require('sequelize');
var ServerModel = require('./servers-model');

var db = dbConnection();
export interface LayerAdminInstance extends Sequelize.Instance<LayerAdminInstance, App.LayerAdmin>, App.LayerAdmin { }
export interface LayerAdminModel extends Sequelize.Model<LayerAdminInstance, App.LayerAdmin> { }


var sequalizeModel = db.define<LayerAdminInstance, App.LayerAdmin>('layer_admin', <any>{
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    layerName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },
    layerType: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },
    serverID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            len: [1, 30]
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
sequalizeModel.sync(); 

export var Model = sequalizeModel;