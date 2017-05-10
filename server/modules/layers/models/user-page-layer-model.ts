import dbConnection = require('../../../core/db-connection');
import Sequelize = require('sequelize');
import PageModel = require('../../users/models/page-model')
import LayerAdminModel = require ('./layers-admin-model')

var db = dbConnection();


export interface UserPageLayerInstance extends Sequelize.Instance<UserPageLayerInstance, App.UserPageLayer>, App.UserPageLayer { }
export interface UserPageLayerModel extends Sequelize.Model<UserPageLayerInstance, App.UserPageLayer> { }


var sequalizeModel = db.define<UserPageLayerInstance, App.UserPageLayer>('user_page_layer', <any>{
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    userID: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    layerON: {
        type: Sequelize.BOOLEAN,
    }
});

sequalizeModel.belongsTo(PageModel.Model)
sequalizeModel.belongsTo(LayerAdminModel.Model)
sequalizeModel.sync(); 

export var Model = sequalizeModel;