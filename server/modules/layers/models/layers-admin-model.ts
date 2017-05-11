import dbConnection = require('../../../core/db-connection');
import Sequelize = require('sequelize');

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
    layerURL: {
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
        allowNull: false,
        validate: {
            len: [1, 200]
        }
    }
});

sequalizeModel.sync(); 

export var Model = sequalizeModel;