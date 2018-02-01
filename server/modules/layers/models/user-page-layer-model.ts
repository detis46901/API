import dbConnection = require('../../../core/db-connection');
import Sequelize = require('sequelize');
import PageModel = require('../../users/models/page-model');
import LayerModel = require ('./layers-model');
import UserModel = require('../../users/models/user-model');

var db = dbConnection();


export interface UserPageLayerInstance extends Sequelize.Instance<UserPageLayerInstance, App.UserPageLayer>, App.UserPageLayer { }
export interface UserPageLayerModel extends Sequelize.Model<UserPageLayerInstance, App.UserPageLayer> { }


var sequalizeModel = db.define<UserPageLayerInstance, App.UserPageLayer>('user_page_layer', <any>{
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    layerON: {
        type: Sequelize.BOOLEAN,
    layerOrder: {
        type: Sequelize.INTEGER
    }
    }
});

sequalizeModel.belongsTo(UserModel.Model)
sequalizeModel.belongsTo(PageModel.Model)
sequalizeModel.belongsTo(LayerModel.Model)
sequalizeModel.sync(); 

export var Model = sequalizeModel;