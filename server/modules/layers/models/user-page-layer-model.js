"use strict";
var dbConnection = require('../../../core/db-connection');
var Sequelize = require('sequelize');
var PageModel = require('../../users/models/page-model');
var LayerModel = require('./layers-model');
var UserModel = require('../../users/models/user-model');
var db = dbConnection();
var sequalizeModel = db.define('user_page_layer', {
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    layerON: {
        type: Sequelize.BOOLEAN
    },
    layerOrder: {
        type: Sequelize.INTEGER
    },
    style: {
        type: Sequelize.JSON
    }
});
sequalizeModel.belongsTo(UserModel.Model);
sequalizeModel.belongsTo(PageModel.Model);
sequalizeModel.belongsTo(LayerModel.Model);
sequalizeModel.sync();
exports.Model = sequalizeModel;

//# sourceMappingURL=../../../source-maps/modules/layers/models/user-page-layer-model.js.map
